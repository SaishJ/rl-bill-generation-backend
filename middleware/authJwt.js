import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.utils.js";

export const authJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return errorHandler(res, 401, "Access token missing");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
    next();
  } catch (error) {
    return errorHandler(res, 401, "Invalid authorization");
  }
};
