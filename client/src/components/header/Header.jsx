import React, { useState, useContext } from 'react';
import './header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faPlane, faTaxi, faPerson, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext"; 
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type, page }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [city, setCity] = useState("");

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if(page === "carRentals"){
      navigate("/rentals", { state: { city, dates } });
    } else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
    }
  }

  return (
    <div className="header">
      <div className="headerContainer">
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
          <Link to="/flights" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={`headerListItem ${location.pathname === "/flights" ? "active" : ""}`}>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
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

        <h1 className="headerTitle">Welcome to Kosovo!</h1>
        <p className="HeaderDesc">We’re here to make your visit unforgettable — top hotels, tasty restaurants, and rides that get you around with ease.</p>
      {/*  {!user && <button className="headerBtn">Sign in / Register</button>}*/}

        {/* HOTEL SEARCH */}
        {page !== "carRentals" && (
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
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
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
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        )}

       {/* CAR RENTAL SEARCH */}
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
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;