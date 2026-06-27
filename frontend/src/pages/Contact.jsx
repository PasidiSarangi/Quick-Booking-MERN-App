import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      alert("Message sent successfully! Our team will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

          <form className="contact-form-pro" onSubmit={handleSubmit}>
            <h2>Send a message</h2>

            <input 
              type="text" 
              name="name"
              placeholder="Your name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              name="subject"
              placeholder="Subject" 
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea 
              name="message"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contact;