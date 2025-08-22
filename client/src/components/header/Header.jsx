import React from 'react';
import './header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="header">
        <div className="headerContainer">
        
         <div className="headerList">

        <div className="headerListItem active">
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faCar} />
          <span>Car Rentals</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faBed} />
          <span>Attractions</span>
        </div>

        <div className="headerListItem">
          <FontAwesomeIcon icon={faTaxi} />
          <span>Airport Taxis</span>
            </div>
        </div>
        <h1 className="headerTitle">Nothing beats a JET2 holiday.</h1>
        <p className="HeaderDesc">And right now, you can say 50$ per person, thats 200$ off for a family of four.</p>
      <button className="headerBtn">Sign in / Register</button>
      </div>
    </div>
  );
}

export default Header;
