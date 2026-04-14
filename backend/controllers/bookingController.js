const Booking = require("../models/Booking");

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ userName: req.params.userName })
      .populate("room")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
};

const createBooking = async (req, res) => {
  try {
    const { userName, room, date, startTime, endTime, purpose } = req.body;

    if (!userName || !room || !date || !startTime || !endTime || !purpose) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBooking = await Booking.findOne({
      room,
      date,
      startTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This room is already booked for that date and start time",
      });
    }

    const booking = await Booking.create({
      userName,
      room,
      date,
      startTime,
      endTime,
      purpose,
    });

    const populatedBooking = await booking.populate("room");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

module.exports = {
  getBookings,
  getBookingsByUser,
  createBooking,
  deleteBooking,
};