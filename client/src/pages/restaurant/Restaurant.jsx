import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import RestaurantSearchItem from "../../components/restaurantSearchItem/RestaurantSearchItem";
import "./restaurant.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Restaurant = () => {
  const [city, setCity] = useState(""); 
  const [restaurants, setRestaurants] = useState([]);
  const [searched, setSearched] = useState(false); 

  const handleSearch = async () => {
    setSearched(true); 
    if (!city) {
      setRestaurants([]);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8800/api/restaurants?city=${city}`);
      setRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Header page="restaurants" city={city} setCity={setCity} onSearch={handleSearch} />

      {/* Best Reviewed Restaurants */}
      {restaurants.length === 0 && !searched && (
        <div className="restaurantDesignSection">
          <h1>The Best Reviewed Restaurants</h1>
          <p>Kosovo’s top restaurants loved by visitors</p>
          <div className="restaurantCards">
            {/* Static Card 1 */}
            <div className="restaurantCard">
              <img src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758487560/restaurant_salt-prishtina_image1_bwybuk.jpg" alt="Salt Prishtina" />
              <h2>Salt Prishtina</h2>
              <div className="restaurantStars">
                <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
              </div>
              <p>Salt is about tasting the Mediterranean cuisine, seafood and sushi.</p>
            </div>

            {/* Static Card 2 */}
            <div className="restaurantCard">
              <img src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758488254/bukezemer_iczckf.jpg" alt="BUKË E ZEMËR" />
              <h2>BUKË E ZEMËR</h2>
              <div className="restaurantStars">
                <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
              </div>
              <p>A family run restaurant aims at making everyone feel at home by serving the most delicious traditional dishes.</p>
            </div>

            {/* Static Card 3 */}
            <div className="restaurantCard">
              <img src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758488503/comandanto_v8hxiu.png" alt="Comandante Marcos" />
              <h2>Comandante Marcos</h2>
              <div className="restaurantStars">
                <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
              </div>
              <p>Mexican Restaurant who serves authentic Mexican food, tequilas, mezcal y cocktails.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="restaurantsResults">
        {restaurants.length === 0 && searched && <p>No restaurants found in {city}.</p>}
        {restaurants.map(r => <RestaurantSearchItem key={r.id} restaurant={r} />)}
      </div>
    </div>
  );
};

export default Restaurant;
