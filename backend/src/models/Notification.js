const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    isRead: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["cleaning_done", "subscription", "general"],
      default: "general",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);