import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <div>
            <p className="section-badge">My Reservations</p>
            <h1>My Bookings</h1>
            <p>
              View your room reservations, booking times, and cancel bookings
              when needed.
            </p>
          </div>

          <Link to="/rooms">
            <button className="primary-btn">Book New Room</button>
          </Link>
        </div>

        <div className="booking-summary">
          <div>
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>

          <div>
            <h3>
              {
                bookings.filter(
                  (booking) => new Date(booking.date) >= new Date()
                ).length
              }
            </h3>
            <p>Upcoming</p>
          </div>

          <div>
            <h3>Active</h3>
            <p>Account Status</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="booking-empty">
            <h2>No bookings yet</h2>
            <p>
              You have not reserved any study rooms yet. Browse available rooms
              and make your first booking.
            </p>

            <Link to="/rooms">
              <button className="primary-btn">Browse Rooms</button>
            </Link>
          </div>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <div className="booking-card-top">
                  <div>
                    <h3>{booking.room?.name || "Room"}</h3>
                    <p>{booking.room?.location || "Location unavailable"}</p>
                  </div>

                  <span>Confirmed</span>
                </div>

                <div className="booking-details">
                  <p>
                    <strong>Date</strong>
                    {booking.date}
                  </p>

                  <p>
                    <strong>Time</strong>
                    {booking.startTime} - {booking.endTime}
                  </p>

                  <p>
                    <strong>Purpose</strong>
                    {booking.purpose}
                  </p>
                </div>

                <button
                  className="cancel-booking-btn"
                  onClick={() => deleteBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;