import { Link } from "react-router-dom";
import "./carSearchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


const CarSearchItem = ({ company }) => {
  return (
    <div className="carSearchItem">
      <img
        src={company.photo || "https://via.placeholder.com/200"}
        alt={company.name}
        className="csiImg"
      />
      <div className="csiDesc">
        <h1 className="csiTitle">{company.name}</h1>
        <span className="csiCity">
          <FontAwesomeIcon icon={faLocationDot} className="csiIcon" />{" "}
          {company.city}
        </span>
        <span className="csiAddress">{company.address}</span>
        <span className="csiPhone">
    <FontAwesomeIcon icon={faPhone} className="csiIcon" /> {company.phone || "N/A"}
  </span>
        <p className="csiDescText">{company.description}</p>
        <span className="csiVehiclesCount">
          {company.vehicles?.length || 0} cars available
        </span>
      </div>
      <div className="csiAction">
        <Link to={`/rentals/${company.id}`}>
          <button className="csiBtn">See availability</button>
        </Link>
      </div>
    </div>
  );
};
export default CarSearchItem;


