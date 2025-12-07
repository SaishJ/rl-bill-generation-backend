import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const seed = async () => {
  await mongoose.connect(process.env.MONGO_STRING);

  await User.deleteMany();

  const password = "Admin@2903";
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: "Admin",
    email: "saish@yopmail.com",
    password: hashedPassword,
  });

  console.log("Default user created");
  process.exit();
};

seed();
