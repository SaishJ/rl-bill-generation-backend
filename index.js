import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDb();

const PORT = process.env.PORT;

app.use("/api/auth", userRouter);

app.listen(PORT, () => console.log("Server listening on port:", PORT));
