import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

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

      toast.success("Welcome back! Login successful.");

      if (res.data.user.role === "admin") {
        navigate("/admin/rooms");
      } else {
        navigate("/rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
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
              Use your account to book study rooms.
            </p>

            <div className="auth-info-card">
              <h3>Admin Access</h3>
              <p>Are you an administrator?</p>
              <Link to="/admin/login" className="nav-outline-btn" style={{display: 'inline-block', marginTop: '10px'}}>
                Go to Admin Portal
              </Link>
            </div>
          </div>

          <div className="auth-right">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <p className="auth-subtext">Enter your email and password</p>

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
                New user? <Link to="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;