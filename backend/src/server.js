import dbConnect from './db/db.js'
import dotenv from 'dotenv'
import {app} from './app.js'

dotenv.config()
dbConnect()
.then(()=>{
app.listen(`{process.env.PORT}`,()=>{
console.log(`server is running on port :${process.env.PORT}`)
})
})
.catch((error)=>{
    console.log("error occured while running server",error);
})
