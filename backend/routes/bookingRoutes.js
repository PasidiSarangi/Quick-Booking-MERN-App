const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getBookings,
  getBookingsByUser,
  createBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.get("/", protect, admin, getBookings);
router.get("/my-bookings", protect, getBookingsByUser);
router.post("/", protect, createBooking);
router.delete("/:id", protect, deleteBooking);

module.exports = router;