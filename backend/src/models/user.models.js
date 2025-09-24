import mongoose from 'mongoose'
import  jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema= new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        lowecase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,

    },
    fullname:{
        type:String,
    },
    location: { 
        type: String 
    }
},{timestamps:true});
export const User=mongoose.model("User",userSchema);

userSchema.pre("save",async function(next){
    if(!this.isModified(password)) return next();
    this.password= await  bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect= async function(password){
 return await   bcrypt.compare(this.password,password);

};

userSchema.methods.generateAccessToken=function (){
    return jwt.sign({
        id:this._id,
        role:this.role
    },
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"2d"
})
};
userSchema.methods.generateRefreshToken=fucntion(){
    return jwt.sign({
        id:this._id,
        role:this.role
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:'7d'
})
}

 