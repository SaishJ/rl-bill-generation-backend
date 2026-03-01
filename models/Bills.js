import { model, Schema } from "mongoose";

const billItemSchema = new Schema({
  description: String,
  hsn: String,
  qty: Number,
  rate: Number,
  amount: Number,
});

const billSchema = new Schema(
  {
    billType: {
      type: String,
      enum: ["gst", "non-gst"],
      required: true,
    },
    name: String,
    address: String,
    invoice_no: String,
    date: String,
    venue: String,

    // GST
    gst_tin_no: String,
    state_code: String,
    gst_percentage: Number,
    event_date: String,

    // Items
    items: [billItemSchema],

    // Totals
    amount: Number,
    total: Number,
    extraAmount: Number,

    autoCalculate: Boolean,
  },
  { timestamps: true }
);

const BillModel = model("Bill", billSchema);
export default BillModel;
