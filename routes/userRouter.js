import express from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Login route
router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/refresh-token", refreshToken);

export default router;
