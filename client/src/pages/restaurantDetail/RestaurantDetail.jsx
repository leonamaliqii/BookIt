import React, { useState, useContext } from "react";
import "./restaurantDetail.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RestaurantDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`http://localhost:8800/api/restaurants/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>No restaurant found</div>;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenSlider(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleReservation = () => {
    if (user) {
      navigate(`/restaurant-reserve/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />

      {openSlider && (
        <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpenSlider(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber].url} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
        </div>
      )}

      <div className="restaurantContainer">
        {/* TOP SECTION: LEFT (title/address/cuisine) + RIGHT (working hours) */}
        <div className="restaurantTop">
          <div className="restaurantTopLeft">
            <h1 className="restaurantTitle">{data.name}</h1>
            <div className="restaurantAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <p className="restaurantCuisine">{data.cuisine}</p>
          </div>

          <div className="restaurantTopRight">
            <div className="workingHours">
              <h3>Working Hours:</h3>
              <ul>
                {data.working_hours &&
                  Object.entries(data.working_hours).map(([day, hours]) => (
                    <li key={day}>
                      <b>{day}:</b> {hours}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="restaurantImages">
          {data.photos?.map((photo, i) => (
            <div className="restaurantImgWrapper" key={i}>
              <img onClick={() => handleOpen(i)} src={photo.url} alt="" className="restaurantImg" />
            </div>
          ))}
        </div>

        {/* DESCRIPTION + BUTTON */}
        <div className="restaurantDetails">
          <p className="restaurantDesc">{data.description}</p>
          <div className="restaurantButtonWrapper">
            <button className="button" onClick={handleReservation}>
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>

      <MailList />
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
