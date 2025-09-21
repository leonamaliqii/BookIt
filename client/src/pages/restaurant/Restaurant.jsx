import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import RestaurantSearchItem from "../../components/restaurantSearchItem/RestaurantSearchItem";
import "./restaurant.css";
import { set } from "date-fns";

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
