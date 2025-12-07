import UserModel from "../models/User.js";
import { errorHandler } from "../utils/errorHandler.utils.js";
import bcrypt from "bcrypt";
import { generateJwt } from "../utils/jwt.util.js";

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
      return errorHandler(res, 401, "Invalid email or password");
    }

    // Generate Jwt
    const token = generateJwt({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    // Success
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        access_token: token,
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
      return errorHandler(res, 401, "User already exists");
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
