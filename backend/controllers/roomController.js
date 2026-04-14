const Room = require("../models/Room");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

const createRoom = async (req, res) => {
  try {
    const { name, location, capacity, image } = req.body;

    const room = await Room.create({
      name,
      location,
      capacity,
      image,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to create room" });
  }
};

module.exports = {
  getRooms,
  createRoom,
};