import { configrations } from "../config/congi.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from  'jsonwebtoken'


export const isAuthenticated = asyncHandler( async (req ,res , next) => {
    //  check tokens
    const token = req?.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ' , "");
    
    if(!token) {
        // throw new  ApiError (400 , "User is not auhtenticated.")
        throw new ApiError (400 , "User is not auhtenticated.")
    };

    //  decode the token

    try {
        const decodedToken = jwt.verify(token , configrations.accesstoken );

        // find user

        const user = await UserModel.findById(decodedToken?._id).select('-password -refreshToken');
        if(!user) {
            throw new ApiError(404 , "UnAuthorized user." )
        };

        // set user to req
        req.user = user;
        next(); 
    } catch (error) {
        console.log("Getting error while decoding the token");
        throw new ApiError(401 , "Invalid access token." , error?.message)   
    };
    
});