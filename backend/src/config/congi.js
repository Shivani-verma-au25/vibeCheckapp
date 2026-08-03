import dotenv from 'dotenv'

dotenv.config()

export const configrations = {
    port : process.env.PORT,
    mongo_uri : process.env.MONGO_URL,
    accesstoken : process.env.ACCESS_TOKEN,
    refreshtoken : process.env.REFRESH_TOKEN,
    accesstokenExpire : process.env.ACCESS_TOKEN_EXPIER,
    refreshtokenExpire : process.env.REFRESH_TOKEN_EXPIRE,
    // cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
    // cloudinarySecretKey : process.env.CLOUDINARY_API_SECRET,
    // cloudinaryName : process.env.CLOUDINARY_CLOUD_NAME,
    imakeKitPrivateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
    imageKitPublicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
    imageKitUrlEndpoint : process.env.IMAGE_KIT_URL_ENDPOINT
};



