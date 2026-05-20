const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    scheduledDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["assigned", "completed", "missed"], default: "assigned" },
    completedAt: { type: Date },
    proofImage: { type: String },
    remarks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);