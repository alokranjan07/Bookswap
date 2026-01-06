import {User} from '../models/user.models.js'
import { AsyncHandler } from '../utils/Asynchandler.js'
import { ApiResponse } from '../utils/Apiresponse.js'
import { ApiError } from '../utils/ApiError.js'

const updateName=AsyncHandler(async(req,res)=>{
    
    const{fullname}=req.body
    if(!fullname){
        throw new ApiError(400,"fullname is required")
    }
    const user=await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404,"user doesnt exist")
    }
    user.fullname=fullname;
    await user.save();
    return res.status(200)
    .json(new ApiResponse(200,"user fullname updated",user))
})
const updateProfilePic=AsyncHandler(async(req,res)=>{
    const {picture}=req.body
    if(!picture){
        throw new ApiError(400,"mising picture")
    }
    const user=await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404,"user not found")
    }
    user.picture=picture;
    await user.save();

    return res.status(200)
    .json(new ApiResponse(200," Profile picture updated succefully"))


})
const updatePhone=AsyncHandler(async(req,res)=>{
    const {phone}=req.body
    if(!phone){
        throw new ApiError(400,"phone number is required")
    }
    const user=await User.findById(req.user_id)
    if(!user){
        throw new ApiError(404,"user doesnt exsits")
    }
    user.phone=phone;
    await user.save();

    return res.status(200)
    .json(new ApiResponse(200,"phone number updated succesfully"))

})
const addLocation=AsyncHandler(async(req,res)=>{
    const{location}=req.body
    if(!location){
     throw new ApiError(404,"address ir required")
    }
    const user =await User.findById(req.user_id)
    if(!user){
        throw new ApiError(404,"user doesnt exist")
    }
    user.location=location;
    await user.save();
    return res.status(200)
   .json(new ApiResponse(200,"user address updated succesfully"))

})

export{
     updateProfilePic,
     addLocation,
      updateName,
       updateProfilePic,
       updatePhone


}