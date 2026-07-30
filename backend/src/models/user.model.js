import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from  'jsonwebtoken'
import { configrations } from "../config/congi.js";


const userSchema = new Schema({

    name : {
        type :String,
        trim:true,
        required : [true , "Name is required."]
    },
    email : {
        type :String,
        trim:true,
        required : [true , "Email is required."]
    },
    password : {
        type :String,
        required : [true , "Password is required."],
    },
    image : {
        type :String,
        default :''
    },
    refreshToken : {
        type :String,
    }


},{timestamps : true})


// methods

userSchema.pre('save' , async function(){
    if(!this.isModified('password')) return ;
    this.password = await bcryptjs.hash(this.password , 10);
});

// compare password

userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password , this.password);
};


// generate accessToken 

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    } , configrations.accesstoken,{expiresIn : configrations.accesstokenExpire});
}


// generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id:this._id,
        } , 
    configrations.refreshtoken,{expiresIn : configrations.refreshtokenExpire});
}

export const UserModel = mongoose.model('UserModel',userSchema);