import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import RestaurantSearchItem from "../../components/restaurantSearchItem/RestaurantSearchItem";
import "./restaurant.css";
import { set } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Restaurant = () => {
    const [city, setCity]= useState("");
    const [restaurants, setRestaurants] = useState([]);

    const handleSearch = async () => {
        if(!city) return;
        try{
            const res = await axios.get(`http://localhost:8800/api/restaurants?city=${city}`);
       setRestaurants(res.data);
        }catch(err){
            console.log(err);
        }
    };
return (
    <div>
      <Navbar />
      <Header type="list" page="restaurants" setCity={setCity} onSearch={handleSearch} />
    
       <div className="restaurantDesignSection">
        <h1>The Best Reviewed Restaurants</h1>
        <p>Kosovo’s top restaurants loved by visitors</p>
        <div className="restaurantCards">
          {/* Card 1 */}
          <div className="restaurantCard">
            <img
              src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758487560/restaurant_salt-prishtina_image1_bwybuk.jpg"
              alt="Salt Prishtina"
            />
            <h2>Salt Prishtina</h2>
            <div className="restaurantStars">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
    </div>
            <p>Salt is about tasting the Mediterranean cuisine, seafood and sushi.</p>
          </div>

          {/* Card 2 */}
          <div className="restaurantCard">
            <img
              src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758488254/bukezemer_iczckf.jpg"
              alt="BUKË E ZEMËR"
            />
            <h2>BUKË E ZEMËR</h2>
            <div className="restaurantStars">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
    </div>
            <p>A family run restaurant aims at making everyone feel at home by serving the most delicious traditional dishes.</p>
          </div>

          {/* Card 3 */}
          <div className="restaurantCard">
            <img
              src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758488503/comandanto_v8hxiu.png"
              alt="Comandante Marcos"
            />
            <h2>Comandante Marcos</h2>
            <div className="restaurantStars">
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
    </div>
            <p>Mexican Restaurant who serves authentic Mexican food, tequilas, mezcal y cocktails.</p>
          </div>
        </div>
      </div>

     
      <div className="restaurantsResults">
        {restaurants.length === 0 && <p>No restaurants found.</p>}
        {restaurants.map(r => (
          <RestaurantSearchItem key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
