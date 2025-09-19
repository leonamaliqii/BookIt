/*import { Link } from "react-router-dom";
import "./carSearchItem.css";

const CarSearchItem = ({ company }) => {
  return (
    <div className="carSearchItem">
      <img
        src={company.photo || "default-company.jpg"} // fallback if no photo
        alt={company.name}
        className="csiImg"
      />
      <div className="csiDesc">
        <h1 className="csiTitle">{company.name}</h1>
        <p className="csiCity">{company.city}</p>
        <p className="csiDescText">{company.description}</p>

        <h3>Available Vehicles:</h3>
        {company.vehicles.length === 0 ? (
          <p>No vehicles available</p>
        ) : (
          <ul className="csiVehicles">
            {company.vehicles.map((v) => (
              <li key={v.id}>
                {v.brand} {v.model} ({v.year}) - ${v.price_per_day}/day
                <br />
                <img
                  src={v.photo || "default-car.jpg"}
                  alt={`${v.brand} ${v.model}`}
                  className="csiVehicleImg"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="csiAction">
        <Link to={`/rentals/${company.id}`}>
          <button className="csiBtn">See availability</button>
        </Link>
      </div>
    </div>
  );
};

export default CarSearchItem;*/

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
