import { UserModel } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

export const generateAccessTokenAndRefreshTokens = async (userId) => {
    //find the user bases of user id
    const user = await UserModel.findById(userId).select('-password -refreshToken')

    if(!user){
        throw new ApiError(400 , 'We could not find the user.')
    };

    //  generate tokens
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // refreshtoken save into db
        user.refreshToken =  refreshToken,
        // save changes
        await user.save({validateBeforeSave : false});

        // return the tokens
        return { accessToken , refreshToken}
        
    } catch (error) {
        throw new ApiError(500 , 'Something went wrong while generating tokens')
    } 
}