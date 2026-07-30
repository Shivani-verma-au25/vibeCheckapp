import dotenv from 'dotenv'

dotenv.config()

export const configrations = {
    port : process.env.PORT,
    mongo_uri : process.env.MONGO_URL,
    accesstoken : process.env.ACCESS_TOKEN,
    refreshtoken : process.env.REFRESH_TOKEN,
    accesstokenExpire : process.env.ACCESS_TOKEN_EXPIER,
    refreshtokenExpire : process.env.REFRESH_TOKEN_EXPIRE,
};

