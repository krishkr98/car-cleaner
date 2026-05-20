const router = require("express").Router();
const {
  getSubscription,
  createSubscription,
  cancelSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.use(protect, roleCheck("customer", "admin"));
router.get("/", getSubscription);
router.post("/", createSubscription);
router.delete("/", cancelSubscription);

module.exports = router;