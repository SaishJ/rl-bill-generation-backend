import UserModel from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.utils.js";
import bcrypt from "bcrypt";
import { generateJwt, generateRefreshToken } from "../utils/jwt.util.js";
import { sendMail } from "../utils/mail.util.js";
import { loginTemplate } from "../templates/loginTemplate.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorHandler(res, 400, "Email and password is required");
    }
    // Check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return errorHandler(res, 500, "No default user found in database");
    }
    // Check valid email and password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (user.email !== email || !matchPassword) {
      return errorHandler(res, 400, "Invalid email or password");
    }

    // Generate Jwt
    const token = generateJwt({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    // Generate Refresh Token
    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    user.refresh_token = refreshToken;
    await user.save();

    // await sendMail(user.email, "Login successfully", loginTemplate(user));

    // Success
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        access_token: token,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    req.error = error;
    console.log("Failed to login user:", error);
    return errorHandler(res, undefined, undefined, error);
  }
};

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const userExists = await UserModel.findOne({ email: data?.email });
    if (userExists) {
      return errorHandler(res, 409, "User already exists");
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: hashPassword });
    res
      .status(201)
      .json({ success: true, message: "User created sucessfully", user });
  } catch (error) {
    req.error = error;
    console.log("Failed to register user:", error);
    return errorHandler(res, undefined, undefined, error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return errorHandler(res, 400, "Refresh token is required");
    }

    const decode = jwt.verify(refresh_token, process.env.REFRESH_SECRET);

    const user = await UserModel.findById(decode.id);

    console.log(user);

    if (!user || user.refresh_token !== refresh_token) {
      return errorHandler(res, 403, "Invalid refresh token");
    }

    const newToken = generateJwt({
      id: user._id,
    });
    res.status(201).json({
      success: true,
      message: "Token generated successfully",
      access_token: newToken,
    });
  } catch (error) {
    req.error = error;
    console.log("Token expired");
    return errorHandler(res, 403, undefined, error);
  }
};
