import express from "express";
import {
  createBill,
  getAllBills,
  getBillDetails,
  updateBill,
} from "../controllers/bill.controller.js";
import { authJWT } from "../middleware/authJwt.js";

const router = express.Router();

router.get("/", authJWT, getAllBills);

router.get("/:id", authJWT, getBillDetails);

router.post("/create", authJWT, createBill);

router.put("/:id", authJWT, updateBill);

export default router;
