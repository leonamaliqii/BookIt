import React, { useState, useContext } from "react";
import axios from "axios";
import "./bookingForm.css";
import { AuthContext } from "../../context/AuthContext";

const BookingForm = ({ itemId, itemType, price }) => {
  const { user } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      setLoading(false);
      return;
    }

    const cardNumberDigits = cardNumber.replace(/\s+/g, ""); 
    if (!/^\d{16}$/.test(cardNumberDigits)) {
      alert("Please enter a valid 16-digit card number.");
      setLoading(false);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      alert("End date must be after start date.");
      setLoading(false);
      return;
    }

    const diffTime = end - start;
    const numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = numDays * price;

    const bookingData = {
      itemId,
      itemType,
      userId: user?._id || "guest",
      firstName,
      lastName,
      startDate,
      endDate,
      numDays,
      totalPrice,
      cardNumber: cardNumberDigits,
    };

    try {
      const res = await axios.post("/api/car-bookings", bookingData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Booking saved:", res.data);

      // show success message
      setSuccessMessage(`✅ Booking successful! Total: $${totalPrice}`);
      setTimeout(() => setSuccessMessage(""), 5000);

      // reset form
      setStartDate("");
      setEndDate("");
      setCardNumber("");
      setLastName("");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookingFormWrapper">
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <form className="bookingForm" onSubmit={handleSubmit}>
        <h3>Book this car</h3>

        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </label>

        <button type="submit" className="bookingBtn" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
