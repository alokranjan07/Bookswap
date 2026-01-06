import mongoose from 'mongoose'

const swapSchema=new mongoose.Schema({
    owner:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    requester:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    availableBook:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"

    },
    swapedBook:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    status:{
        required:true,
        enum:["pending","swapped","rejected","sold"],
        default:"pending"

    } 
},{
    timestamps:true
})