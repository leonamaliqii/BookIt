import React, { useState, useContext } from 'react';
import './header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faTaxi, faMapMarkerAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext"; 
import { AuthContext } from '../../context/AuthContext';

const Header = ({ page, city, setCity, onSearch }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (page === "carRentals") {
      navigate("/rentals", { state: { city, dates } });
    } else if (page === "restaurants") {
      if (onSearch) onSearch(); // call parent function
    } else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
    }
  };

  // Dynamic titles & descriptions
  let headerTitle = "";
  let headerDesc = "";

  if (page === "hotels") {
    headerTitle = "Find the Best Hotels in Kosovo!";
    headerDesc = "Book top-rated hotels and enjoy your stay in comfort and style.";
  } else if (page === "carRentals") {
    headerTitle = "Explore Kosovo with ease!";
    headerDesc = "Pick the perfect car and drive anywhere with ease.";
  } else if (page === "restaurants") {
    headerTitle = "Discover the Best Restaurants!";
    headerDesc = "Savor delicious meals at the top dining spots in Kosovo.";
  } else {
    headerTitle = "Welcome to Kosovo!";
    headerDesc = "We’re here to make your visit unforgettable — top hotels, tasty restaurants, and rides that get you around with ease.";
  }

  return (
    <div className={`header ${page === "restaurants" ? "restaurants" : ""} ${page === "carRentals" ? "carRentals" : ""}`}>
      <div className="headerContainer">
        {/* Navigation links */}
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
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
          </Link>
          <Link to="/taxis" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/taxis" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxis</span>
            </div>
          </Link>
        </div>

        {/* Dynamic title & description */}
        <h1 className="headerTitle">{headerTitle}</h1>
        <p className="HeaderDesc">{headerDesc}</p>

        {/* HOTEL SEARCH */}
        {page !== "carRentals" && page !== "restaurants" && (
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        )}

        {/* CAR RENTAL SEARCH */}
        {page === "carRentals" && (
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="headerIcon" />
              <input
                type="text"
                placeholder="Search by city"
                className="headerSearchInput"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        )}

        {/* RESTAURANT SEARCH */}
        {page === "restaurants" && (
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faUtensils} className="headerIcon" /> 
              <input
                type="text"
                placeholder="Where to eat?"
                className="headerSearchInput"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
