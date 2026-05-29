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
const updateRoom = async (req, res) => {
  try {
    const { name, location, capacity, image } = req.body;

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, location, capacity, image },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Failed to update room" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete room" });
  }
};
module.exports = {
  getRooms,
  createRoom,
   updateRoom,
  deleteRoom,
};