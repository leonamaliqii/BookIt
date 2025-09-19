import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CarSearchItem from "../../components/carSearchItem/CarSearchItem";
import axios from "axios";
import "./carRentals.css";

const CarRentals = () => {
  const location = useLocation();
  const { city } = location.state || {}; 
  const [companies, setCompanies] = useState([]);

  const popularCompanies = [
  { id: 1, name: "Grande Rent a Car", photo: "https://res.cloudinary.com/dicr6ysyv/image/upload/v1758291475/rent-a-car-prishtina_zmpgj0.png" },
  { id: 2, name: "U-Drive", photo: "https://res.cloudinary.com/dicr6ysyv/image/upload/v1758291475/Udrive-Rent-a-Car-Prishtina_ybjsyv.jpg" },
  { id: 3, name: "AutoLux", photo: "https://res.cloudinary.com/dicr6ysyv/image/upload/v1758291982/renta_mlnzks.jpg" },
];

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!city) return; 
      try {
        
        const res = await axios.get(`/api/companies?city=${city}`);

        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, [city]);
  

 return (
    <div>
      <Navbar />
      <Header type="list" page="carRentals" />
      <h2 className="carIntroTitle">Most Popular Car Rentals in Kosovo</h2>
<div className="popularCompanies">
  {popularCompanies.map((company) => (
    <div key={company.id} className="popularCompanyCard">
      <img src={company.photo} />
      <p>{company.name}</p>
    </div>
  ))}
</div>

      <div className="carResults">
        {city && companies.length > 0 && (
          <h2>Available Car Rentals in: {city}</h2>
        )}
        {city && companies.length === 0 && <p>No companies found.</p>}

        {companies.map((company) => (
          <CarSearchItem key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CarRentals;