import jwt from "jsonwebtoken";

export const generateJwt = (data) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "10d";
  return jwt.sign(data, secretKey, { expiresIn });
};

export const generateRefreshToken = (data) => {
  const secretKey = process.env.REFRESH_SECRET;
  const expiresIn = "365d";
  return jwt.sign(data, secretKey, { expiresIn });
};
