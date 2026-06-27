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
    const bookings = await Booking.find({ userName: req.user.name })
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

    // Advanced overlap validation
    const existingBookings = await Booking.find({ room, date });

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const reqStart = startH * 60 + startM;
    const reqEnd = endH * 60 + endM;

    for (let b of existingBookings) {
      const [bStartH, bStartM] = b.startTime.split(':').map(Number);
      const [bEndH, bEndM] = b.endTime.split(':').map(Number);
      const bStart = bStartH * 60 + bStartM;
      const bEnd = bEndH * 60 + bEndM;

      if (Math.max(reqStart, bStart) < Math.min(reqEnd, bEnd)) {
        return res.status(400).json({
          message: "This room is already booked during the requested time block",
        });
      }
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