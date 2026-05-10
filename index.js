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

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", userRouter);

app.use("/api/bill", billRouter);

app.listen(PORT, "0.0.0.0", () =>
  console.log("Server listening on port:", PORT)
);
