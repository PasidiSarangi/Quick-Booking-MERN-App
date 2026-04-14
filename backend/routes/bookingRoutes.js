const express = require("express");
const router = express.Router();
const {
  getBookings,
  getBookingsByUser,
  createBooking,
  deleteBooking,
} = require("../controllers/bookingController");

router.get("/", getBookings);
router.get("/user/:userName", getBookingsByUser);
router.post("/", createBooking);
router.delete("/:id", deleteBooking);

module.exports = router;