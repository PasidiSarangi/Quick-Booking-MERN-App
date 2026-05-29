import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
      const adminUser = {
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin/rooms");
    } else {
      alert("Invalid admin email or password");
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

              <button type="submit" className="primary-btn auth-btn">
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;