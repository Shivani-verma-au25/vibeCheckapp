import { configrations } from "../config/congi.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import redis from "../config/cache.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = asyncHandler(async (req, res, next) => {
    console.log("========== AUTH CHECK ==========");

    console.log("🍪 COOKIES:", req.cookies);

    const authHeader = req.header("Authorization");
    console.log("📦 AUTHORIZATION:", authHeader);

    const token =
        req.cookies?.accessToken ||
        authHeader?.replace("Bearer ", "");

    console.log("🔑 TOKEN:", token);

    if (!token) {
        console.log("❌ NO TOKEN FOUND");

        throw new ApiError(
            401,
            "User is not authenticated."
        );
    }

    console.log("🔍 Checking Redis...");

    const isTokenBlackListed = await redis.get(token);

    console.log("🔴 BLACKLIST:", isTokenBlackListed);

    if (isTokenBlackListed) {
        console.log("❌ TOKEN BLACKLISTED");

        throw new ApiError(
            401,
            "User is not authenticated. Token is blacklisted."
        );
    }

    try {
        console.log("🔐 Verifying JWT...");

        const decodedToken = jwt.verify(
            token,
            configrations.accesstoken
        );

        console.log("✅ DECODED TOKEN:", decodedToken);

        const user = await UserModel
            .findById(decodedToken._id)
            .select("-password -refreshToken");

        console.log("👤 USER:", user);

        if (!user) {
            throw new ApiError(
                404,
                "Unauthorized user."
            );
        }

        req.user = user;

        console.log("✅ AUTHENTICATION SUCCESS");

        next();

    } catch (error) {

        console.log("❌ AUTH ERROR:", error);

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            401,
            "Invalid access token."
        );
    }
});


// -------------------------------------

// export const isAuthenticated = asyncHandler( async (req ,res , next) => {
//     //  check tokens
//     console.log("🍪 ACCESS TOKEN:", req.cookies?.accessToken);

//     const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ' , "");
//     console.log("🔑 TOKEN:", token);
    
//     if(!token) {
//         // throw new  ApiError (400 , "User is not auhtenticated.")
//         throw new ApiError (400 , "User is not auhtenticated.")
//     };

//     // blacklist check

//     const isTokenBlackListed = await redis.get(token);
//     console.log("🔴 BLACKLIST:", isTokenBlackListed);
    

//     if(isTokenBlackListed){
//         throw new ApiError(401 , "User is not authenticated. Token is blacklisted.")
//     }

//     //  decode the token

//     try {
//         const decodedToken =  jwt.verify(token , configrations.accesstoken );

//         // find user

//         const user = await UserModel.findById(decodedToken?._id).select('-password -refreshToken');
//         if(!user) {
//             throw new ApiError(404 , "UnAuthorized user." )
//         };

//         // set user to req
//         req.user = user;
//         next();
//     } catch (error) {
//         if (error instanceof ApiError) {
//             throw error;
//         }

//         throw new ApiError(
//             401,
//             "Invalid access token."
//         );
// }

// });
