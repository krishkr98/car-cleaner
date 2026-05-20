const router = require("express").Router();
const {
  getEmployeeTasks,
  getCustomerHistory,
  completeTask,
  getEmployeeHistory,
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const { upload } = require("../config/cloudinary");

router.get("/my-tasks", protect, roleCheck("employee"), getEmployeeTasks);
router.get("/my-history", protect, roleCheck("employee"), getEmployeeHistory);
router.get("/history", protect, roleCheck("customer"), getCustomerHistory);
router.patch(
  "/:id/complete",
  protect,
  roleCheck("employee"),
  upload.single("proofImage"),
  completeTask
);

module.exports = router;