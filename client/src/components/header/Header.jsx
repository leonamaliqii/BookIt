import React, { useState, useContext } from 'react';
import './header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faMapMarkerAlt, faUtensils, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext"; 
import { AuthContext } from '../../context/AuthContext';

const Header = ({ page, city, setCity, onSearch, showSearch = true, heroImage }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

  
  const [rentalCity, setRentalCity] = useState("");

  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (page === "carRentals") {
      navigate("/rentals", { state: { city: rentalCity, dates } });
    } else if (page === "restaurants" && onSearch) {
      onSearch();
    } else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
    }
  };

  let headerTitle = "";
  let headerDesc = "";

  switch(page) {
    case "hotels":
      headerTitle = "Find the Best Hotels in Kosovo!";
      headerDesc = "Book top-rated hotels and enjoy your stay in comfort and style.";
      break;
    case "carRentals":
      headerTitle = "Explore Kosovo with ease!";
      headerDesc = "Pick the perfect car and drive anywhere with ease.";
      break;
    case "restaurants":
      headerTitle = "Discover the Best Restaurants!";
      headerDesc = "Savor delicious meals at the top dining spots in Kosovo.";
      break;
    case "attractions":
      headerTitle = "Discover Kosovo!";
      headerDesc = "Explore the most beautiful attractions and things to do across the country.";
      break;
    default:
      headerTitle = "Welcome to Kosovo!";
      headerDesc = "We’re here to make your visit unforgettable!";
  }

  return (
    <div 
      className={`header ${page}`} 
      style={heroImage ? { backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="headerContainer">
        {/* Navigation */}
        <div className="headerList">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
          </Link>
          <Link to="/rentals" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/rentals" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rentals</span>
            </div>
          </Link>
          <Link to="/restaurants" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/restaurants" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faUtensils} />
              <span>Restaurants</span>
            </div>
          </Link>
          <Link to="/attractions" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/attractions" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faLandmark} />
              <span>Attractions</span>
            </div>
          </Link>
        </div>

        {/* Title & Description */}
        <h1 className="headerTitle">{headerTitle}</h1>
        <p className="headerDesc">{headerDesc}</p>

        {/* Search bar only if showSearch = true */}
        {showSearch && page !== "attractions" && (
          <div className="headerSearch">
            {(page !== "carRentals" && page !== "restaurants") && (
              <>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <input 
                    type="text" 
                    placeholder="Where are you going?" 
                    value={destination}
                    className="headerSearchInput"
                    onChange={e => setDestination(e.target.value)}
                  />
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                  <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                    {`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}
                  </span>
                  {openDate && (
                    <DateRange 
                      editableDateInputs={true} 
                      onChange={item => setDates([item.selection])} 
                      ranges={dates} 
                      className="date" 
                      minDate={new Date()} 
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>Search</button>
                </div>
              </>
            )}

            {page === "carRentals" && (
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="headerIcon" />
                <input 
                  type="text" 
                  placeholder="Search by city" 
                  value={rentalCity} 
                  onChange={e => setRentalCity(e.target.value)} 
                  className="headerSearchInput"
                />
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            )}

            {page === "restaurants" && (
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faUtensils} className="headerIcon" />
                <input 
                  type="text" 
                  placeholder="Where to eat?" 
                  value={city} 
                  onChange={e => setCity(e.target.value)} 
                  className="headerSearchInput"
                />
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
