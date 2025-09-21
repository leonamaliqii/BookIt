import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    console.log("Selected Rooms:", selectedRooms);
  }, [selectedRooms]);

  const navigate = useNavigate();
const handleClick = () => {
  // calculate total price for selected rooms
const totalPrice = selectedRooms.reduce((sum, roomId) => {
  const room = data.find(item => item.roomNumbers.some(r => r._id === roomId));
  return sum + (room?.price || 0) * alldates.length; 
}, 0);

navigate("/hotel-booking", {
  state: {
    hotelId,
    hotelName: data[0]?.title, // add hotel name for display
    selectedRooms,
    startDate: dates[0].startDate,
    endDate: dates[0].endDate,
    totalPrice,
  },
});

};


  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {loading
          ? "Loading..."
          : data
              ?.filter((item) => item) // <-- Filter out null rooms
              .map((item) => (
                <div className="rItem" key={item._id}>
                  <div className="rItemInfo">
                    <div className="rTitle">{item?.title}</div>
                    <div className="rDesc">{item?.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item?.maxPeople}</b>
                    </div>
                    <div className="rPrice">{item?.price}</div>
                  </div>
                  <div className="rSelectRooms">
                    {item?.roomNumbers?.map((roomNumber) =>
                      roomNumber ? (
                        <div className="room" key={roomNumber._id}>
                          <label>{roomNumber.number}</label>
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
