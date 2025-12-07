import jwt from "jsonwebtoken";

export const generateJwt = (data) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "10d";
  return jwt.sign(data, secretKey, { expiresIn });
};
