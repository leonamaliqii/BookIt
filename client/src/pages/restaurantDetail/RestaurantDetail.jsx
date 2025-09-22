import "./restaurantDetail.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const RestaurantDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // restaurant id
  const { data, loading, error } = useFetch(`http://localhost:8800/api/restaurants/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

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
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <div className="restaurantDetailContainer">
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpenSlider(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="restaurantWrapper">
            <h1 className="restaurantTitle">{data.name}</h1>
            <div className="restaurantAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <div className="restaurantImages">
              {data.photos?.map((photo, i) => (
                <div className="restaurantImgWrapper" key={i}>
                  <img src={photo} alt="" onClick={() => handleOpen(i)} className="restaurantImg" />
                </div>
              ))}
            </div>
            <div className="restaurantDetails">
              <p className="restaurantDesc">{data.description}</p>
              <button onClick={handleReservation}>See Availability</button>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
