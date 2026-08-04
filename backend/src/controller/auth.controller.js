import { json } from "express";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessTokenAndRefreshTokens } from "../utils/generateAccessAndRefreahToken.js";
import { uploadFile } from "../utils/cloudinaryUploder.js";
import redis from '../config/cache.js'

// user signup controller
export const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // todo hamdle image

    if ([name, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    // check user is already exixt
    const existedUser = await UserModel.findOne({ email }).select("-password");
    if (existedUser) {
        throw new ApiError(404, "User already exist.");
    }
  
    // image handler

    const file = req.file;
    let uploadedImage = null;

    // only upload if file is provided
    if (file) {
        try {
            // check if file is provided
            if (!file) {
                throw new ApiError(400, "No file provided for upload.");
            }
            // upload file to imagekit
            uploadedImage = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
            });
        } catch (error) {
            throw new ApiError(400, `Failed to upload file to Cloudinary: ${error.message}`);
        }
    }

    // create new user
    const user = await UserModel.create({
        name,
        email,
        password,
        image: uploadedImage ? uploadedImage.url : null,
    });

    // check user is created
    const createdUser = await UserModel.findById(user?._id).select(
        "-password -refreshToken",
    );

    if (!createdUser) {
        throw new ApiError(400, "User have not created yet.");
    }

    // tokens

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshTokens(createdUser?._id);

    // http methond options

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000, //1 hour
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        })
        .json(
            new ApiResponse(
                200,
                { user: createdUser, refreshToken },
                "User created successfully.",
            ),
        )
});

// user sign controller
export const signInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(409, "Email is required.");
    }
    if (!password) {
        throw new ApiError(409, "password is required.");
    }

    // check exist user
    const user = await UserModel.findOne({ email }).select("-refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // const validate password

    const IsPasswordCorrect = await user.comparePassword(password);

    if (!IsPasswordCorrect) {
        throw new ApiError(409, "your password or email is not correct");
    }

    // generate token

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshTokens(user?._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000, //1 hour
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 60 * 60 * 1000, //7 hour
        })
        .json(
            new ApiResponse(
                200,
                { user, refreshToken, accessToken },
                "User sign in successfully",
            ),
        );
});

// export const signOut controller

export const signOutUser = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "User not authenticated.");
    }

    await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        {   returnDocument: "after"},
    );

    // blacklist the access token in redis
    await redis.set(req.cookies?.accessToken, 'blackListed' ,   "EX",  60 * 60); // Set expiration time for 1 hour
    // await redis.set(req.cookies?.accessToken, Date.now().toString()); 



    return res
        .status(200)
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000, //1 hour
        })
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1 * 60 * 60 * 1000, //7 hour
        })
        .json(new ApiResponse(200, {}, "User signed out successfully."));
});

// get me controller

export const getMe = asyncHandler(async (req, res) => {
    const userId = req?.user?._id;

    const user = await UserModel.findById(userId).select(
        "-password -refreshToken",
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current logged in user."));
});
