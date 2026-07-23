const Room = require("../models/Room");

const getRooms = async (req, res) => {
  try {
    const defaultRooms = [
      {
        name: "Study Room A",
        location: "2nd Floor",
        capacity: 6,
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Discussion Room",
        location: "Library Wing",
        capacity: 8,
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Conference Room",
        location: "Main Building",
        capacity: 12,
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Silent Study Pod 101",
        location: "1st Floor • Quiet Zone",
        capacity: 2,
        image:
          "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Collaborative Lab B",
        location: "Innovation Hub • 3rd Floor",
        capacity: 10,
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Executive Boardroom",
        location: "Admin Tower • 5th Floor",
        capacity: 16,
        image:
          "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Media & Project Room",
        location: "Tech Center • Ground Floor",
        capacity: 6,
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Research Suite C",
        location: "Science Library • 4th Floor",
        capacity: 4,
        image:
          "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Focus Room B2",
        location: "West Hall • 2nd Floor",
        capacity: 3,
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      },
    ];

    for (const defRoom of defaultRooms) {
      const exists = await Room.findOne({ name: defRoom.name });
      if (!exists) {
        await Room.create(defRoom);
      }
    }

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