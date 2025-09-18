import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./carRentals.css";

const CarRentals = () => {
  const location = useLocation();
  const { city } = location.state || {}; // fixed destructuring
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!city) return; // nothing to search
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
        <h2>Available Car Rentals in {city}</h2>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          companies.map((company) => (
            <div key={company.id} className="carCompany">
              <h3>{company.name}</h3>
              <p>{company.city}</p>
              <p>{company.description}</p>
              {/* later we can show company photo here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarRentals;
