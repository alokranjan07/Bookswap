import mongoose from 'mongoose'
import {User} from '../models/user.models.js'
import {Book} from '../models/book.models.js'

const commentSchema=new mongoose.Schema({

    comment:{
        type:String,
        required:true,
        trim:true

    },

    commenter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commentedBook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true

    }
},{timestamps:true})

export const Comment=mongoose.model("Comment",commentSchema)