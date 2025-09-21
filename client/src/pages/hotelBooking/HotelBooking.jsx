import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./hotelBooking.css";

const HotelBooking = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || "");
  const [cardNumber, setCardNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { hotelId, selectedRooms, startDate, endDate, totalPrice } = location.state || {};

  useEffect(() => {
    if (!hotelId || !selectedRooms || selectedRooms.length === 0) {
      setErrorMessage("No rooms selected. Go back and select a room first.");
    }
  }, [hotelId, selectedRooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !cardNumber || !phone) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!hotelId || !selectedRooms || selectedRooms.length === 0) {
      setErrorMessage("No rooms selected.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const payload = {
      hotelId,
      rooms: selectedRooms,
      startDate,
      endDate,
      totalPrice,
      userId: user?._id || "guest",
      firstName: fullName.split(" ")[0] || fullName,
      lastName: fullName.split(" ")[1] || "",
    };

    try {
      const res = await axios.post("http://localhost:8800/api/hotel-bookings", payload);
      setSuccessMessage(`Booking successful! Total: $${totalPrice}`);
      setFullName("");
      setCardNumber("");
      setPhone("");
      setTimeout(() => navigate("/"), 4000); 
    } catch (err) {
      console.error(err.response || err);
      setErrorMessage(err.response?.data?.error || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotelBookingPage">
      <div className="hotelBookingWrapper">
        {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <form className="hotelBookingForm" onSubmit={handleSubmit}>
          <h3>Book Your Hotel</h3>
          <label>
            Full Name:
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </label>
          <label>
            Card Number:
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" required />
          </label>
          <label>
            Phone Number:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+383 44 123 456" required />
          </label>
          <p>Total Price: ${totalPrice}</p>
          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelBooking;
