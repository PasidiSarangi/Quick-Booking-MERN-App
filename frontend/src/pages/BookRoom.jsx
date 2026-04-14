import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

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
    <div className="container">
      <h1>Book Room</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="purpose"
          placeholder="Purpose of booking"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookRoom;