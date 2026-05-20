const router = require("express").Router();
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.use(protect, roleCheck("customer", "admin"));
router.get("/", getCars);
router.post("/", addCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;