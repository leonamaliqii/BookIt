import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../../components/bookingForm/BookingForm";
import { AuthContext } from "../../context/AuthContext";
import "./carBooking.css";

const CarBooking = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`/api/vehicles/${vehicleId}`);
        setVehicle(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  if (!vehicle) return <p>Loading vehicle data...</p>;

  return (
    <div className="bookingPage">
      <div className="bookingContainer">
      
        <div className="vehicleCard">
          <img
            src={vehicle.photo || "https://via.placeholder.com/450x250"}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="vehicleImage"
          />
          <div className="vehicleDetails">
            <h2>{vehicle.brand} {vehicle.model}</h2>
            <p>Year: {vehicle.year}</p>
            <p>Price per day: ${vehicle.price_per_day}</p>
          </div>
        </div>

        {/* Booking form */}
       <BookingForm
  itemId={Number(vehicle.id)}  
  itemType="car"
  price={vehicle.price_per_day}
/>

      </div>
    </div>
  );
};

export default CarBooking;
