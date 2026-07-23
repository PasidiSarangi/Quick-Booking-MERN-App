import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function AdminRooms() {
  const toast = useToast();
  const [rooms, setRooms] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);

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

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      capacity: "",
      image: "",
    });
    setEditingRoomId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingRoomId) {
        await axios.put(`http://localhost:5000/api/rooms/${editingRoomId}`, {
          ...formData,
          capacity: Number(formData.capacity),
        });
        toast.success("Room updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/rooms", {
          ...formData,
          capacity: Number(formData.capacity),
        });
        toast.success("Room added successfully!");
      }

      resetForm();
      fetchRooms();
    } catch (error) {
      console.error("Error saving room:", error);
      toast.error("Failed to save room");
    }
  };

  const handleEdit = (room) => {
    setEditingRoomId(room._id);
    setFormData({
      name: room.name,
      location: room.location,
      capacity: room.capacity,
      image: room.image || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    toast.confirm({
      title: "Delete Room",
      message: "Are you sure you want to delete this study room? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/rooms/${id}`);
          toast.success("Room deleted successfully!");
          fetchRooms();
        } catch (error) {
          console.error("Error deleting room:", error);
          toast.error("Failed to delete room");
        }
      },
    });
  };

  return (
    <div className="admin-rooms-page">
      <div className="container">
        <div className="admin-page-header">
          <div>
            <p className="section-badge">Admin Panel</p>
            <h1>Manage Rooms</h1>
            <p>Add, update, and manage study rooms available for booking.</p>
          </div>
        </div>

        <section className="admin-layout">
          <form className="admin-room-form" onSubmit={handleSubmit}>
            <h2>{editingRoomId ? "Edit Room" : "Add New Room"}</h2>

            <div className="form-grid">
              <input
                type="text"
                name="name"
                placeholder="Room name"
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
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="primary-btn">
                {editingRoomId ? "Update Room" : "Add Room"}
              </button>

              {editingRoomId && (
                <button type="button" className="secondary-btn" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="admin-room-list">
            <div className="admin-list-header">
              <h2>All Rooms</h2>
              <span>{rooms.length} rooms</span>
            </div>

            {rooms.length === 0 ? (
              <div className="admin-empty">
                <h3>No rooms added yet</h3>
                <p>Add your first room using the form above.</p>
              </div>
            ) : (
              <div className="admin-room-grid">
                {rooms.map((room) => (
                  <div className="admin-room-card" key={room._id}>
                    <img
                      src={room.image || "https://via.placeholder.com/600x400?text=Room"}
                      alt={room.name}
                    />

                    <div className="admin-room-content">
                      <div>
                        <h3>{room.name}</h3>
                        <p>{room.location}</p>
                        <span>{room.capacity} seats</span>
                      </div>

                      <div className="room-action-buttons">
                        <button onClick={() => handleEdit(room)}>Edit</button>
                        <button
                          className="delete-room-btn"
                          onClick={() => handleDelete(room._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminRooms;