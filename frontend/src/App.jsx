import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import BookRoom from "./pages/BookRoom";
import MyBookings from "./pages/MyBookings";
import AdminRooms from "./pages/AdminRooms";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/book/:id" element={<BookRoom />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;