const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getBookings,
  getBookingsByUser,
  getBookingsByRoom,
  createBooking,
  deleteBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

router.get("/", protect, admin, getBookings);
router.get("/my-bookings", protect, getBookingsByUser);
router.get("/room/:roomId", getBookingsByRoom);
router.post("/", protect, createBooking);
router.delete("/:id", protect, deleteBooking);
router.put("/:id/status", protect, admin, updateBookingStatus);

module.exports = router;