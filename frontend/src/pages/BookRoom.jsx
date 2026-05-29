import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function BookRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      const selectedRoom = res.data.find((item) => item._id === id);
      setRoom(selectedRoom);
    } catch (error) {
      console.error("Error fetching room:", error);
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
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        userName: user?.name,
        room: id,
      });

      alert("Booking created successfully");
      navigate("/my-bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="book-room-page">
      <div className="container">
        <div className="book-room-header">
          <Link to="/rooms">← Back to rooms</Link>
          <h1>Complete Your Booking</h1>
          <p>Select a date, time slot, and purpose to reserve your study room.</p>
        </div>

        <div className="book-room-layout">
          <div className="booking-room-summary">
            <img
              src={room?.image || "https://via.placeholder.com/600x400?text=Room"}
              alt={room?.name || "Room"}
            />

            <div className="summary-content">
              <span>Selected Room</span>
              <h2>{room?.name || "Study Room"}</h2>
              <p>{room?.location || "Location unavailable"}</p>

              <div className="summary-detail">
                <strong>Capacity</strong>
                <p>{room?.capacity || "-"} seats</p>
              </div>

              <div className="summary-note">
                Your booking will be confirmed after submitting the form.
              </div>
            </div>
          </div>

          <form className="book-room-form" onSubmit={handleSubmit}>
            <h2>Booking Details</h2>

            <div className="form-row">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="time-grid">
              <div className="form-row">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <label>Purpose</label>
              <textarea
                name="purpose"
                placeholder="Example: Group study, project discussion, exam preparation..."
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="booking-submit-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;