import BillModel from "../models/Bills.js";
import { errorHandler } from "../utils/errorHandler.utils.js";

export const createBill = async (req, res) => {
  try {
    const data = req.body;
    const bill = await BillModel.create(data);
    res
      .status(201)
      .json({ success: true, message: "Bill created successfully", bill });
  } catch (error) {
    req.error = error;
    console.log("Failed to create new bill", error);
    return errorHandler(res, undefined, undefined, error);
  }
};

export const getAllBills = async (req, res) => {
  try {
    const { type } = req.query;

    let filter = {};

    if (type) {
      filter.billType = type;
    }

    const bills = await BillModel.find(filter).sort({ createdAt: -1 });
    res.status(201).json({
      count: bills.length,
      data: bills,
      message: "Bills fetched successfully",
    });
  } catch (error) {
    req.error = error;
    console.log("Failed to fetch bills");
    return errorHandler(res, undefined, undefined, error);
  }
};

export const getBillDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await BillModel.findById(id);

    if (!bill) {
      return errorHandler(res, 404, "Bill id not found");
    }
    res.status(201).json({
      success: true,
      data: bill,
      message: "Bill fetched successfully",
    });
  } catch (error) {
    req.error = error;
    console.log("Failed to fetch bill details");
    return errorHandler(res, undefined, undefined, error);
  }
};

export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBill = await BillModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBill) {
      return errorHandler(res, 404, "Bill not found");
    }

    res.status(201).json({
      message: "Bill updated successfully",
      data: updatedBill,
    });
  } catch (error) {
    req.error = error;
    console.log("Failed to update bill");
    return errorHandler(res, undefined, undefined, error);
  }
};
