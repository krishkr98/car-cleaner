const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, enum: ["Hatchback", "Sedan", "SUV"], required: true },
    licensePlate: { type: String, required: true, uppercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);