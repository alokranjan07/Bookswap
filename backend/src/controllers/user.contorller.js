 import User from "../models/user.models.js";
import { Asynchandler } from "../utils/Asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";

const signup = Asynchandler(async (req, res) => {
    const { email, password, fullname, location } = req.body;

   
    if (!email || !password || !fullname) {
        throw new ApiError(400, null, "Email, fullname, and password are required for signup");
    }

     
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, null, "User already exists");
    }

 
    const newUser = await User.create({
        fullname,
        email,
        password,
        location,
    });

    if (!newUser) {
        throw new ApiError(500, null, "Failed to create user");
    }

     const accesstoken = newUser.generateAccessToken();
    const refreshtoken = newUser.generateRefreshToken();

     
    res
        .status(201)
        .cookie("accesstoken", accesstoken, {
            httpOnly: true,
            secure: true,  
            sameSite: "Strict",
        })
        .cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        .json(new Apiresponse(201, "User created successfully", newUser));
});

 
const login=Asynchandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new ApiError(404,"user not found");
    }
   const user= await User.findOne({email})
   if(!user){
    throw new ApiError(404,"user not found")
   }
    const checkedPassword= await isPasswordCorrect(password)
    if(!checkedPassword){
        throw new ApiError(402,"password inccorect");
    }

    const accesstoken=user.generateAccessToken();
    const refreshtoken=user.generateRefreshToken();

    res.status(200)
    .cookie('accesstoken',accesstoken,{
        httpOnly:true,
        secure:true,
        
    })
    .cookie('refreshtoken',refreshtoken,{
        httpOnly:true,
        secure:true
    })
    .json(new Apiresponse(200,"login successful",user))

    
});

const logout=Asynchandler(async(req,res)=>{

    res
    .clearCookie("accesstoken",accesstoken)
    .clearCookie("refreshtoken",refreshtoken)
    .status(200)
    .json(new Apiresponse(200,"user logout"))
})

export {signup ,logout,login}