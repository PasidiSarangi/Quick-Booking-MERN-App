import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function BookRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));

  const [room, setRoom] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    fetchRoom();
    fetchRoomBookings();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      const selectedRoom = res.data.find((item) => item._id === id);
      setRoom(selectedRoom);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  const fetchRoomBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/room/${id}`);
      setExistingBookings(res.data);
    } catch (error) {
      console.error("Error fetching room bookings:", error);
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

      toast.success("Booking created successfully!");
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  const dateBookings = existingBookings.filter((b) => b.date === formData.date);

  return (
    <div className="book-room-page">
      <div className="container">
        <div className="book-room-header">
          <Link to="/rooms">← Back to rooms</Link>
          <h1>View Availability & Book</h1>
          <p>Check room availability for your date and reserve your study space.</p>
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

              <div className="room-availability-panel">
                <div className="availability-header">
                  <strong>Room Availability</strong>
                  <span className="availability-date font-bold">
                    {formData.date ? formData.date : "Select a date"}
                  </span>
                </div>

                {formData.date ? (
                  dateBookings.length === 0 ? (
                    <div className="availability-status-free">
                      <span className="status-dot green"></span>
                      All slots available for this date
                    </div>
                  ) : (
                    <div className="availability-booked-list">
                      <p className="booked-list-title">Existing Reservations:</p>
                      {dateBookings.map((b, index) => (
                        <div key={index} className="booked-time-chip">
                          <span className="status-dot orange"></span>
                          {b.startTime} - {b.endTime} ({b.status || "booked"})
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="availability-hint">Choose a date in the form to check schedule.</p>
                )}
              </div>
            </div>
          </div>

          <form className="book-room-form" onSubmit={handleSubmit}>
            <h2>Booking Details</h2>

            <div className="form-row">
              <label>Select Date</label>
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
              Confirm & Book Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;