import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./companyVehicles.css";

const CompanyVehicles = () => {
  const { companyId } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`/api/companies/${companyId}`);
      setCompanyName(res.data.name);
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      console.error(err);
    }
  };
  fetchVehicles();
}, [companyId]);

  return (
    <div className="vehiclesPage">
      <h2>Vehicles from {companyName}</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles available</p>
      ) : (
        <div className="vehicleList">
          {vehicles.map((v) => (
            <div key={v.id} className="vehicleCard">
              <img
                src={v.photo || "https://via.placeholder.com/200x120"}
                alt={`${v.brand} ${v.model}`}
                className="vehicleImg"
              />
              <h3>{v.brand} {v.model}</h3>
              <p>Year: {v.year}</p>
              <p>Price per day: ${v.price_per_day}</p>
              <button className="bookBtn">Book Now</button> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyVehicles;
