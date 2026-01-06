import {User} from '../models/user.models.js'

const AuthMiddleware=AsyncHandeler(async(req,res)=>{
    const token=req.cookies.accesstoken
    if(!token){
        throw new ApiError(404,"tokens  not found")
    }
    const decodedtoken=await jwt.verfiy(token,process.env.tokenAccess_token)
    if(!decodedtoken){
        throw new apiError(400,"mising decoded token")
    }
    const user=await User.findById(decodedtoken._id);

    req.user=user
    next();

})
export {AuthMiddleware}