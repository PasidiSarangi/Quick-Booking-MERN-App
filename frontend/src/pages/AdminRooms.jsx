import { useEffect, useState } from "react";
import axios from "axios";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    image: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/rooms", {
        ...formData,
        capacity: Number(formData.capacity),
      });

      setFormData({
        name: "",
        location: "",
        capacity: "",
        image: "",
      });

      fetchRooms();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin - Manage Rooms</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Room</button>
      </form>

      <div className="grid">
        {rooms.map((room) => (
          <div className="card" key={room._id}>
            <img
              src={room.image || "https://via.placeholder.com/400x200?text=Room"}
              alt={room.name}
              className="card-image"
            />
            <h3>{room.name}</h3>
            <p><strong>Location:</strong> {room.location}</p>
            <p><strong>Capacity:</strong> {room.capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRooms;