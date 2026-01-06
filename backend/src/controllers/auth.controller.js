import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

  const registerUser = asyncHandler(async (req, res) => {
  const { email, password, fullname, location } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    email,
    password,
    fullname,
    location,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const safeUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    })
    .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

 
  const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User found"));
});

 
  const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const userlogedIn = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    })
    .json(new ApiResponse(200, userlogedIn, "Login successful"));
});

 
 const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "Logout successful"));
});

 
  const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    })
    .json(new ApiResponse(200, null, "Token refreshed"));
});

export {
registerUser,
getUser,
loginUser,
logoutUser ,
refreshAccessToken
}