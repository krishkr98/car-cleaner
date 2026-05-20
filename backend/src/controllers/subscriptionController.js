const Subscription = require("../models/Subscription");

exports.getSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findOne({
      customer: req.user._id,
      status: "active",
    }).populate("car");
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  const { carId, packageType, timeSlot } = req.body;
  try {
    const existing = await Subscription.findOne({
      customer: req.user._id,
      status: "active",
    });
    if (existing) {
      existing.packageType = packageType;
      existing.timeSlot = timeSlot;
      existing.car = carId;
      await existing.save();
      return res.json(existing);
    }
    const sub = await Subscription.create({
      customer: req.user._id,
      car: carId,
      packageType,
      timeSlot,
    });
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findOneAndUpdate(
      { customer: req.user._id, status: "active" },
      { status: "cancelled" },
      { new: true }
    );
    if (!sub) return res.status(404).json({ message: "No active subscription" });
    res.json({ message: "Subscription cancelled", sub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};