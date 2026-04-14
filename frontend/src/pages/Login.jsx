import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/rooms");
      } else {
        navigate("/rooms");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-left">
            <div className="auth-badge">Welcome Back</div>
            <h1>Login to QuickBook</h1>
            <p>
              Access your bookings, reserve study rooms, and manage your schedule
              in one clean dashboard.
            </p>

            <div className="auth-info-card">
              <h3>Demo Admin Account</h3>
              <p><strong>Email:</strong> admin@gmail.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>

          <div className="auth-right">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <p className="auth-subtext">Enter your details to continue</p>

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
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="auth-footer-text">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;