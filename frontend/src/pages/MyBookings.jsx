import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${user?.name}`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  useEffect(() => {
    if (user?.name) {
      fetchBookings();
    }
  }, []);

  return (
    <div className="container">
      <h1>My Bookings</h1>

      <div className="grid">
        {bookings.map((booking) => (
          <div className="card" key={booking._id}>
            <h3>{booking.room?.name}</h3>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
            <p><strong>Purpose:</strong> {booking.purpose}</p>
            <button onClick={() => deleteBooking(booking._id)}>Cancel Booking</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;