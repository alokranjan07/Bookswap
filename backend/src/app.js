import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());
//importing routes 
import authRoute from './routes/auth.routes.js'
import bookRoute from './routes/book.routes.js'
import commentRoute from './routes/comment.routes.js'
//creating api
app.use("/api/user",authRoute)
app.use("/api/books",bookRoute)
app.use("/api/comments",commentRoute)


export {app}