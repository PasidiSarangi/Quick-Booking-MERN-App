import { useEffect, useState } from "react";
import axios from "axios";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="admin-rooms-page">
      <div className="container">
        <div className="admin-page-header">
          <div>
            <p className="section-badge">Admin Panel</p>
            <h1>User Messages</h1>
            <p>View and manage contact form submissions from users.</p>
          </div>
        </div>

        <section className="admin-layout" style={{ display: "block" }}>
          <div className="admin-room-list" style={{ marginTop: "20px" }}>
            <div className="admin-list-header">
              <h2>All Messages</h2>
              <span>{messages.length} messages</span>
            </div>

            {messages.length === 0 ? (
              <div className="admin-empty">
                <h3>No messages yet</h3>
                <p>When users submit the contact form, their messages will appear here.</p>
              </div>
            ) : (
              <div className="admin-room-grid">
                {messages.map((msg) => (
                  <div className="admin-room-card" key={msg._id} style={{ padding: "20px", display: "block" }}>
                    <div style={{ marginBottom: "15px" }}>
                      <h3 style={{ margin: "0 0 5px 0" }}>{msg.subject}</h3>
                      <p className="msg-meta">
                        From: <strong>{msg.name}</strong> ({msg.email})
                      </p>
                      <p className="msg-meta">
                        Received: {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="msg-box" style={{ padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
                      <p style={{ margin: "0", whiteSpace: "pre-wrap" }}>{msg.message}</p>
                    </div>

                    <div className="room-action-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        className="delete-room-btn"
                        onClick={() => handleDelete(msg._id)}
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminMessages;
