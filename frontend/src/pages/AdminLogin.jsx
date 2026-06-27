import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
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
        alert("This account does not have admin privileges.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid admin email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-left">
            <div className="auth-badge">Admin Portal</div>
            <h1>Admin Login</h1>
            <p>Manage rooms, view bookings, and control the booking system.</p>

            <div className="auth-info-card">
              <h3>Demo Admin Account</h3>
              <p><strong>Email:</strong> admin@gmail.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>

          <div className="auth-right">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>Admin Sign In</h2>
              <p className="auth-subtext">Only admins can access this area</p>

              <input
                type="email"
                name="email"
                placeholder="Admin email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Admin password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit" className="primary-btn auth-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login as Admin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;