// src/components/restaurantSearchItem/RestaurantSearchItem.jsx
import React from "react";
import "./restaurantSearchItem.css"; // krijo këtë file më vonë për CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RestaurantSearchItem = ({ restaurant }) => {
  return (
    <div className="restaurantSearchItem">
      <img
        src={restaurant.photo || "https://via.placeholder.com/200"}
        alt={restaurant.name}
        className="rsiImg"
      />
      <div className="rsiDesc">
        <h1 className="rsiTitle">{restaurant.name}</h1>
        <span className="rsiCity">
          <FontAwesomeIcon icon={faLocationDot} /> {restaurant.city}
        </span>
        <span className="rsiAddress">{restaurant.address}</span>
        <span className="rsiPhone">
          <FontAwesomeIcon icon={faPhone} /> {restaurant.phone || "N/A"}
        </span>
        <p className="rsiDescText">{restaurant.description}</p>
      </div>
      <div className="rsiAction">
        <Link to={`/restaurants/${restaurant.id}`}>
          <button className="rsiBtn">See Availability</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantSearchItem;
