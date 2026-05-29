import { useNavigate } from "react-router-dom";

function RoomCard({ room }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleBookNow = () => {
    if (!user) {
      alert("Please login to continue booking.");
      navigate("/login");
      return;
    }

    navigate(`/book/${room._id}`);
  };

  return (
    <div className="room-card">
      <div className="room-image-wrapper">
        <img
          src={room.image || "https://via.placeholder.com/600x400?text=Room"}
          alt={room.name}
          className="room-card-image"
        />
        <span className="room-badge">Available</span>
      </div>

      <div className="room-card-body">
        <div className="room-card-top">
          <h3>{room.name}</h3>
          <span className="room-capacity">{room.capacity} seats</span>
        </div>

        <p className="room-location">{room.location}</p>

        <div className="room-features">
          <span>Quiet Space</span>
          <span>Wi-Fi</span>
          <span>Study Friendly</span>
        </div>

        <button className="primary-btn room-book-btn" onClick={handleBookNow}>
          {user ? "Book Now" : "Login to Book"}
        </button>
      </div>
    </div>
  );
}

export default RoomCard;