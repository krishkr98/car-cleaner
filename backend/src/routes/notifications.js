const router = require("express").Router();
const {
  getNotifications,
  markAllRead,
  markOneRead,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/", getNotifications);
router.patch("/read-all", markAllRead);
router.patch("/:id/read", markOneRead);

module.exports = router;