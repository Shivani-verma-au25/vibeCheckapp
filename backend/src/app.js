import dotenv from 'dotenv'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'


dotenv.config();

const app = express();


app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true , limit:'16kb'}));
app.use(express.static('public'))
app.use(cookieParser());


// routes
import authRouter from './routes/auth.route.js'

app.get('/api/v1/health-check' , (req , res) => {
    return res.status(200).json({
        success : true,
        message : "Health check ok"
    })
})

app.use('/api/v1/user', authRouter)


// globle error handler 
app.use((err, req, res, next) => {

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
  });
});


export {app};
