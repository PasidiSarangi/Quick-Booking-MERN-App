import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-rooms-page">
      <div className="container">
        <div className="admin-page-header">
          <div>
            <p className="section-badge">Admin Panel</p>
            <h1>Manage Bookings</h1>
            <p>Review and approve or reject room booking requests.</p>
          </div>
        </div>

        <section className="admin-layout" style={{ display: "block" }}>
          <div className="admin-room-list" style={{ marginTop: "20px" }}>
            <div className="admin-list-header">
              <h2>All Bookings</h2>
              <span>{bookings.length} bookings</span>
            </div>

            {bookings.length === 0 ? (
              <div className="admin-empty">
                <h3>No bookings yet</h3>
                <p>When users book a room, their requests will appear here.</p>
              </div>
            ) : (
              <div className="admin-room-grid">
                {bookings.map((booking) => (
                  <div className="admin-room-card" key={booking._id} style={{ padding: "20px", display: "block" }}>
                    <div style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ margin: "0 0 5px 0" }}>{booking.room?.name || "Unknown Room"}</h3>
                        <p className="msg-meta">
                          User: <strong>{booking.userName}</strong>
                        </p>
                        <p className="msg-meta">
                          Date: {booking.date} | {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <span className={`status-badge ${booking.status || 'pending'}`}>
                        {(booking.status || 'pending').toUpperCase()}
                      </span>
                    </div>

                    <div className="msg-box" style={{ padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
                      <p style={{ margin: "0", whiteSpace: "pre-wrap" }}><strong>Purpose:</strong> {booking.purpose}</p>
                    </div>

                    <div className="room-action-buttons" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                      {(booking.status || 'pending') === 'pending' && (
                        <>
                          <button
                            className="primary-btn"
                            onClick={() => handleUpdateStatus(booking._id, 'accepted')}
                            style={{ padding: "8px 16px" }}
                          >
                            Accept
                          </button>
                          <button
                            className="delete-room-btn"
                            onClick={() => handleUpdateStatus(booking._id, 'rejected')}
                            style={{ padding: "8px 16px" }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {(booking.status || 'pending') !== 'pending' && (
                        <button
                          className="secondary-btn"
                          onClick={() => handleUpdateStatus(booking._id, 'pending')}
                          style={{ padding: "8px 16px" }}
                        >
                          Mark as Pending
                        </button>
                      )}
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

export default AdminBookings;
