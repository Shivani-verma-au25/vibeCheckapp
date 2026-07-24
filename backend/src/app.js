import dotenv from 'dotenv'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


export {app};
