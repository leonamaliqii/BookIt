import React, { useState } from "react";
import axios from "axios";
import "./bookingForm.css";

const BookingForm = ({ itemId, itemType, price, user }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      alert("End date must be after start date.");
      return;
    }

    const numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = numDays * price;

    const bookingData = {
      itemId,
      itemType,
      startDate,
      endDate,
      numDays,
      totalPrice,
      userId: user?._id,
      userName: user?.name,
    };

    try {
      const res = await axios.post("/api/bookings", bookingData);
      console.log("Booking saved:", res.data);
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="formCard">
      <h3>Book this car</h3>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
