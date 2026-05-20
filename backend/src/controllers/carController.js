const Car = require("../models/Car");

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id, isActive: true });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCar = async (req, res) => {
  const { brand, model, type, licensePlate } = req.body;
  try {
    const car = await Car.create({
      owner: req.user._id,
      brand,
      model,
      type,
      licensePlate,
    });
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { isActive: false },
      { new: true }
    );
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};