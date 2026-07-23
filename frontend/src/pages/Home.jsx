import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rooms, setRooms] = useState([]);

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

  const getRoomBookingLink = (roomName) => {
    if (!user) return "/login";
    const found = rooms.find(
      (r) => r.name.toLowerCase() === roomName.toLowerCase()
    );
    return found ? `/book/${found._id}` : "/rooms";
  };

  return (
    <div className="home-page professional-home">
      <div className="container">
        <section className="pro-hero">
          <div className="pro-hero-content">
            <p className="pro-label">Study Room Reservation System</p>

            <h1>Book study spaces with confidence.</h1>

            <p className="pro-description">
              QuickBook helps students reserve rooms, manage schedules, and keep
              study sessions organized through a simple booking experience.
            </p>

            <div className="pro-actions">
              {user?.role === "user" ? (
                <>
                  <Link to="/rooms">
                    <button className="pro-primary-btn">Browse Rooms</button>
                  </Link>
                  <Link to="/my-bookings">
                    <button className="pro-secondary-btn">My Bookings</button>
                  </Link>
                </>
              ) : user?.role === "admin" ? (
                <Link to="/admin/rooms">
                  <button className="pro-primary-btn">Open Dashboard</button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <button className="pro-primary-btn">Get Started</button>
                  </Link>
                  <Link to="/register">
                    <button className="pro-secondary-btn">Create Account</button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="pro-hero-image">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
              alt="Study room"
            />
            <div className="image-info-card">
              <h3>Available Study Spaces</h3>
              <p>Quiet rooms for individual and group study sessions.</p>
            </div>
          </div>
        </section>

        <section className="pro-featured">
          <div className="section-heading">
            <p className="pro-label">Available Spaces</p>
            <h2>Featured study rooms</h2>
          </div>

          <div className="pro-room-grid">
            <div className="pro-room-card">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
                alt="Study Room A"
              />
              <div>
                <h3>Study Room A</h3>
                <p>2nd Floor • Capacity 6</p>
                <Link to={getRoomBookingLink("Study Room A")}>
                  View availability
                </Link>
              </div>
            </div>

            <div className="pro-room-card">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                alt="Discussion Room"
              />
              <div>
                <h3>Discussion Room</h3>
                <p>Library Wing • Capacity 8</p>
                <Link to={getRoomBookingLink("Discussion Room")}>
                  View availability
                </Link>
              </div>
            </div>

            <div className="pro-room-card">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Conference Room"
              />
              <div>
                <h3>Conference Room</h3>
                <p>Main Building • Capacity 12</p>
                <Link to={getRoomBookingLink("Conference Room")}>
                  View availability
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pro-benefits">
          <div className="benefit-card">
            <h3>Easy reservations</h3>
            <p>Choose a room, select a time slot, and confirm your booking.</p>
          </div>

          <div className="benefit-card">
            <h3>Clear schedules</h3>
            <p>Keep track of your upcoming study room reservations.</p>
          </div>

          <div className="benefit-card">
            <h3>Admin control</h3>
            <p>Admins can manage rooms and monitor booking activity.</p>
          </div>
        </section>

        <section className="pro-cta">
          <h2>Ready to reserve your study space?</h2>
          <p>Sign in and start managing your room bookings today.</p>

          <Link to={user?.role === "user" ? "/rooms" : "/login"}>
            <button className="pro-primary-btn">Continue</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;