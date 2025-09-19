import { Link } from "react-router-dom";
import "./carSearchItem.css";

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
        <span className="csiCity">{company.city}</span>
        <p className="csiDescText">{company.description}</p>
        <span className="csiVehiclesCount">
          {company.vehicles?.length || 0} vehicles available
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
