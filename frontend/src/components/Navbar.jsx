import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <span className="brand-badge">Q</span>
          <span>QuickBook</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/my-bookings">My Bookings</Link>

        {user?.role === "admin" && <Link to="/admin/rooms">Admin</Link>}

        {!user ? (
          <>
            <Link to="/login" className="nav-outline-btn">
              Login
            </Link>
            <Link to="/register" className="nav-solid-btn">
              Register
            </Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;