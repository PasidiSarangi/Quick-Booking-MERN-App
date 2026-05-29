function About() {
  return (
    <div className="about-page-pro">
      <div className="container">
        <section className="about-hero-pro">
          <div>
            <p className="page-kicker">About QuickBook</p>
            <h1>Helping students find the right study space faster.</h1>
            <p>
              QuickBook is a modern study room reservation system designed to
              make room booking simple, organized, and stress-free for students
              and administrators.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
            alt="Students studying together"
          />
        </section>

        <section className="about-story">
          <div>
            <h2>Why we built QuickBook</h2>
            <p>
              In many campuses, study room reservations are still handled
              manually. This can lead to confusion, repeated bookings, unclear
              availability, and wasted time.
            </p>
            <p>
              QuickBook solves this by giving students a clear place to browse
              rooms, reserve time slots, and manage their bookings.
            </p>
          </div>

          <div className="about-highlight-box">
            <h3>Built for</h3>
            <p>Students, admins, libraries, campuses, and study spaces.</p>
          </div>
        </section>

        <section className="about-feature-row">
          <div>
            <h3>Simple booking</h3>
            <p>Students can reserve rooms with a clear and easy workflow.</p>
          </div>

          <div>
            <h3>Booking history</h3>
            <p>Users can view and manage their own reservations anytime.</p>
          </div>

          <div>
            <h3>Admin management</h3>
            <p>Admins can add rooms and monitor room booking activity.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;