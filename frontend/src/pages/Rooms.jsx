import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rooms-page">
      <div className="container">
        <div className="rooms-header">
          <div>
            <div className="section-badge">Available Spaces</div>
            <h1>Browse Study Rooms</h1>
            <p>
              Find the right room for your next study session and book it in just
              a few clicks.
            </p>
          </div>

          <div className="rooms-search-box">
            <input
              type="text"
              placeholder="Search by room name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rooms-summary">
          <div className="summary-card">
            <h3>{rooms.length}</h3>
            <p>Total Rooms</p>
          </div>
          <div className="summary-card">
            <h3>{filteredRooms.length}</h3>
            <p>Matching Results</p>
          </div>
          <div className="summary-card">
            <h3>Fast</h3>
            <p>Easy booking flow</p>
          </div>
        </div>

        <div className="rooms-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <div className="empty-state">
              <h3>No rooms found</h3>
              <p>Try a different room name or location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;