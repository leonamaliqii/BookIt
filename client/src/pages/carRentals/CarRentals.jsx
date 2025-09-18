import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./carRentals.css";

const CarRentals = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" page="carRentals" />

      <div className="carResults">
        <h2>Available Cars</h2>
        <p>Results will show here after you search 🚗</p>
      </div>
    </div>
  );
};

export default CarRentals;
