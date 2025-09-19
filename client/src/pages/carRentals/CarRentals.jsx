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