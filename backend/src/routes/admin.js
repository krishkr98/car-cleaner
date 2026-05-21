const router = require("express").Router();
const {
  getStats,
  getCustomers,
  getEmployees,
  getSubscriptions,
  getTasks,
  assignTask,
  deleteTask,
  updateEmployee,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.use(protect, roleCheck("admin"));

router.get("/stats", getStats);
router.get("/customers", getCustomers);
router.get("/employees", getEmployees);
router.get("/subscriptions", getSubscriptions);
router.get("/tasks", getTasks);
router.post("/tasks", assignTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/employees/:id", updateEmployee);

module.exports = router;