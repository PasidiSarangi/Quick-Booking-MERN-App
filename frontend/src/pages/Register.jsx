import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      await axios.post("http://localhost:5000/api/auth/register", formData);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-left">
            <div className="auth-badge">Create Account</div>
            <h1>Join QuickBook today</h1>
            <p>
              Create your account to reserve rooms, manage bookings, and enjoy a
              smoother study planning experience.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit-card">
                <span>📅</span>
                <p>Easy room reservations</p>
              </div>
              <div className="auth-benefit-card">
                <span>⚡</span>
                <p>Fast and simple workflow</p>
              </div>
              <div className="auth-benefit-card">
                <span>✅</span>
                <p>Track your own bookings</p>
              </div>
            </div>
          </div>

          <div className="auth-right">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>Create Account</h2>
              <p className="auth-subtext">Fill in your details to get started</p>

              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="primary-btn auth-btn" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>

              <p className="auth-footer-text">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;