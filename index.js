import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";
import userRouter from "./routes/userRouter.js";
import billRouter from "./routes/billRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

connectDb();

const PORT = process.env.PORT;

app.use("/api/auth", userRouter);

app.use("/api/bill", billRouter);

app.listen(PORT, () => console.log("Server listening on port:", PORT));
