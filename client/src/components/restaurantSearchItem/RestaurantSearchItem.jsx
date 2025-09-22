import React from "react";
import "./restaurantSearchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RestaurantSearchItem = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleSeeAvailability = () => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  return (
    <div className="restaurantSearchItem">
      <img
        src={restaurant.photos?.[0] || "https://via.placeholder.com/200"}
        alt={restaurant.name}
        className="rsiImg"
      />
      <div className="rsiDesc">
        <h1 className="rsiTitle">{restaurant.name}</h1>
        <span className="rsiCity">
          <FontAwesomeIcon icon={faLocationDot} /> {restaurant.city}
        </span>
        <span className="rsiAddress">{restaurant.address}</span>
        {restaurant.phone && (
          <span className="rsiPhone">
            <FontAwesomeIcon icon={faPhone} /> {restaurant.phone}
          </span>
        )}
        {restaurant.description && <p className="rsiDescText">{restaurant.description}</p>}
      </div>
      <div className="rsiAction">
        
          <button className="rsiBtn" onClick={handleSeeAvailability}>See Availability</button>
        
      </div>
    </div>
  );
};

export default RestaurantSearchItem;
