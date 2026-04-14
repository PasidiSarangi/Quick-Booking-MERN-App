import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-badge">Smart & Simple Booking</div>
            <h1>
              Book study rooms
              <br />
              without the stress
            </h1>
            <p>
              QuickBook helps students reserve rooms, manage their bookings,
              and organize study sessions with a clean and modern experience.
            </p>

            <div className="hero-actions">
              <Link to="/login">
                <button className="primary-btn">Login</button>
              </Link>

              <Link to="/register">
                <button className="secondary-btn">Register</button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Easy booking access</p>
              </div>
              <div className="stat-card">
                <h3>Fast</h3>
                <p>Reserve in seconds</p>
              </div>
              <div className="stat-card">
                <h3>Clean</h3>
                <p>Simple student-friendly UI</p>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="mockup-card">
              <div className="mockup-top">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>

              <div className="mockup-content">
                <div className="mockup-box">
                  <h4>Available Room</h4>
                  <p>Study Room A</p>
                  <span>2nd Floor • Capacity 6</span>
                </div>

                <div className="mockup-box">
                  <h4>Next Booking</h4>
                  <p>Today • 2:00 PM - 4:00 PM</p>
                  <span>Reserved for group study</span>
                </div>

                <div className="mockup-highlight">
                  <h3>Make your booking smarter</h3>
                  <p>Track rooms, avoid clashes, and manage reservations easily.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Quick Reservations</h3>
            <p>Choose a room, pick a time, and confirm your booking in moments.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧑‍💼</div>
            <h3>Admin Control</h3>
            <p>Admins can manage rooms and monitor all reservation activity.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Better Organization</h3>
            <p>Keep your study plans structured with a clean booking workflow.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;