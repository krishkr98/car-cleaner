const Subscription = require("../models/Subscription");

exports.getSubscription = async (req, res) => {
  try {
    const subs = await Subscription.find({
      customer: req.user._id,
      status: "active",
    }).populate("car");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  const { carId, packageType, timeSlot } = req.body;
  try {
    // Check if this specific car already has an active subscription
    const existing = await Subscription.findOne({
      customer: req.user._id,
      car: carId,
      status: "active",
    });
    if (existing) {
      existing.packageType = packageType;
      existing.timeSlot = timeSlot;
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
  const { carId } = req.body;
  try {
    const query = { customer: req.user._id, status: "active" };
    if (carId) query.car = carId;
    const sub = await Subscription.findOneAndUpdate(
      query,
      { status: "cancelled" },
      { new: true }
    );
    if (!sub) return res.status(404).json({ message: "No active subscription found" });
    res.json({ message: "Subscription cancelled", sub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};