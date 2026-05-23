const User = require("../models/User");
const Car = require("../models/Car");
const Subscription = require("../models/Subscription");
const Task = require("../models/Task");
const Notification = require("../models/Notification");

// Dashboard stats
exports.getStats = async (req, res) => {
  try {
    const [customers, employees, subscriptions, tasks] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "employee" }),
      Subscription.countDocuments({ status: "active" }),
      Task.countDocuments(),
    ]);
    const completedToday = await Task.countDocuments({
      status: "completed",
      completedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });
    res.json({ customers, employees, subscriptions, tasks, completedToday });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all subscriptions
exports.getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find()
      .populate("customer", "name email phone address")
      .populate("car")
      .sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("customer", "name email phone address")
      .populate("employee", "name email area")
      .populate("car")
      .sort({ scheduledDate: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign task to employee
exports.assignTask = async (req, res) => {
  const { customerId, employeeId, carId, scheduledDate, timeSlot, subscriptionId } = req.body;
  try {
    const task = await Task.create({
      customer: customerId,
      employee: employeeId,
      car: carId,
      scheduledDate: new Date(scheduledDate),
      timeSlot,
      subscription: subscriptionId,
      status: "assigned",
    });

    const populated = await Task.findById(task._id)
      .populate("customer", "name email")
      .populate("employee", "name email")
      .populate("car");



    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update employee area
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      { area: req.body.area },
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};