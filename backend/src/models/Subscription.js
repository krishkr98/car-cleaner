const mongoose = require("mongoose");

const PRICES = { Hatchback: 499, Sedan: 459, SUV: 599 };

const subscriptionSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    packageType: { type: String, enum: ["Hatchback", "Sedan", "SUV"], required: true },
    pricePerMonth: { type: Number },
    timeSlot: {
      type: String,
      enum: ["Before 5 AM", "Before 6 AM", "Before 7 AM", "Before 8 AM", "Before 9 AM"],
      required: true,
    },
    status: { type: String, enum: ["active", "paused", "cancelled"], default: "active" },
    startDate: { type: Date, default: Date.now },
    renewalDate: { type: Date },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", async function () {
  this.pricePerMonth = PRICES[this.packageType];
  if (!this.renewalDate) {
    const d = new Date(this.startDate);
    d.setMonth(d.getMonth() + 1);
    this.renewalDate = d;
  }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);