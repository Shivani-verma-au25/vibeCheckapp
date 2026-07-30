import { json } from "express";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessTokenAndRefreshTokens } from "../utils/generateAccessAndRefreahToken.js";

export const signupUser = asyncHandler( async(req , res) =>{
    const {name , email, password } = req.body;
    // todo hamdle image

    if([name , email , password].some((field) => !field || field.trim() === '')){
        return res.status(400).json((new ApiError(400 , "All fields are required.")))
    };

    // check user is already exixt
    const existedUser = await UserModel.findOne({email}).select('-password');
    if(existedUser){
        return res.status(404).json(( new ApiError(404,'User already exist.')))
    };

    // check image

    // create user

    const user = await UserModel.create({
        name,
        email,
        password
    });

    // check user is created 
    const createdUser = await UserModel.findById(user?._id).select('-password -refreshToken');

    if(!createdUser){
        return res.status(400).json((new ApiError(400 , "User have not created yet.")))
    };

    // tokens

    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshTokens(createdUser?._id);
    

    // http methond options

    const option ={
        httpOnly : true,
        secure : false,
    };
    
    
    return res.status(200)
    .cookie('accessToken' , accessToken , option)
    .cookie('refreshToken' , refreshToken , option)
    .json(new ApiResponse(200 , {user :createdUser , refreshToken }, "User created successfully."))

} );


// user sign controller
export const signInUser = asyncHandler( async ( req ,res) => {

    const {email,password} = req.body;

    if (!email) {
        return res.status(409).json((new ApiError((409, "Email is required."))))
    };
    if (!password) {
        return res.status(409).json(new ApiError((409, "password is required.")))
    };

    // check exist user
    const user = await UserModel.findOne({email}).select('-refreshToken');

    if (!user) {
        return res.status(407).json(new ApiError((407, "User not found.")))
    };


    // const validate password

    const IsPasswordCorrect = await user.comparePassword(password);

    if(!IsPasswordCorrect){
        return res.status(409).json(new ApiError((409, "your password or email is not correct")))
    };

    // generate token

    const {accessToken , refreshToken} = await generateAccessTokenAndRefreshTokens(user?._id);
    

    // http methond options

    const option ={
        httpOnly : true,
        secure : false,
    };

    return res.status(200)
    .cookie('accessToken' , accessToken , option)
    .cookie('refreshToken' , refreshToken , option)
    .json(new ApiResponse(200 ,{user , refreshToken , accessToken} , "User sign in successfully"))
});


// export const signOut controller

export const signOutUser = asyncHandler( async ( req ,res ) => {
    // find logged in user

    if(!req?.user || !req?.user?._id ){
        return res.status(400).json(new ApiError(400,"User not authenticated."))
    };


    // update user schema 
    await UserModel.findByIdAndUpdate(req?.user?._id,{
        $set:{refreshToken : ''}
    } , {new : true});

    // clear cookies
    const option = {
        httpOnly : true,
        secure :  false
    };

    return res.status(201)
    .clearCookie('accessToken',accessToken)
    .clearCookie('refreshToken',refreshToken)
    .json( new ApiResponse(201 , {} , "User sign out successfuly."))
})