function Contact() {
  return (
    <div className="contact-page-pro">
      <div className="container">
        <section className="contact-hero-pro">
          <p className="page-kicker">Contact Us</p>
          <h1>Need help with a booking?</h1>
          <p>
            Our support team can help with room reservations, booking issues,
            and account access questions.
          </p>
        </section>

        <section className="contact-content-pro">
          <div className="contact-details-pro">
            <h2>Get in touch</h2>

            <div className="contact-line">
              <span>Email</span>
              <p>support@quickbook.com</p>
            </div>

            <div className="contact-line">
              <span>Phone</span>
              <p>+94 71 234 5678</p>
            </div>

            <div className="contact-line">
              <span>Location</span>
              <p>Colombo, Sri Lanka</p>
            </div>

            <div className="contact-note">
              <h3>Support Hours</h3>
              <p>Monday - Friday, 9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <form className="contact-form-pro">
            <h2>Send a message</h2>

            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Write your message here"></textarea>

            <button type="button">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contact;