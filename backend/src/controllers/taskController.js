const Task = require("../models/Task");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.getEmployeeTasks = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tasks = await Task.find({
      employee: req.user._id,
      scheduledDate: { $gte: today, $lt: tomorrow },
    })
      .populate("customer", "name email phone address")
      .populate("car");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomerHistory = async (req, res) => {
  try {
    const tasks = await Task.find({ customer: req.user._id })
      .populate("employee", "name")
      .populate("car")
      .sort({ scheduledDate: -1 })
      .limit(30);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      employee: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.status === "completed")
      return res.status(400).json({ message: "Already completed" });

    task.status = "completed";
    task.completedAt = new Date();
    task.remarks = req.body.remarks || "";
    if (req.file) task.proofImage = req.file.path;
    await task.save();

    const notif = await Notification.create({
      user: task.customer,
      task: task._id,
      title: "Car Cleaned!",
      message: "Your car has been cleaned today by CAR CLEANERS.",
      imageUrl: task.proofImage,
      type: "cleaning_done",
    });

    res.json({ task, notif });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeHistory = async (req, res) => {
  try {
    const tasks = await Task.find({
      employee: req.user._id,
      status: "completed",
    })
      .populate("customer", "name")
      .populate("car")
      .sort({ completedAt: -1 })
      .limit(50);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};