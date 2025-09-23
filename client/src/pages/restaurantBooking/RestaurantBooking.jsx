import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./restaurantBooking.css";

const RestaurantBooking = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { restaurantId, restaurantName } = location.state || {};

  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!restaurantId) return <div>No restaurant selected.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !date || !time || !numPeople) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const payload = {
      restaurant_id: restaurantId,
      first_name: firstName,
      last_name: lastName,
      date,
      time,
      num_people: numPeople,
    };

    try {
      await axios.post("http://localhost:8800/api/restaurant-reservations", payload);
      setSuccessMessage("Reservation successful!");
      setTimeout(() => navigate("/"), 5000); 
    } catch (err) {
      console.error(err.response || err);
      setErrorMessage(err.response?.data?.error || "Reservation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurantBookingPage">
      <div className="restaurantBookingWrapper">
        {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <form className="restaurantBookingForm" onSubmit={handleSubmit}>
          <h3>Booking at {restaurantName}</h3>

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
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>

          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>

          <label>
            Number of People:
            <input
              type="number"
              value={numPeople}
              min="1"
              onChange={(e) => setNumPeople(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantBooking;
