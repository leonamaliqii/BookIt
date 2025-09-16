import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { roomInputs } from "../../fromSource";
import useFetch from "../../hooks/useFetch";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState(""); // comma-separated numbers
  const [hotelId, setHotelId] = useState("");

  // Fetch available hotels
  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels");

  // Handle text input changes
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle textarea for rooms
  const handleRoomChange = (e) => {
    setRooms(e.target.value);
  };

  // Handle hotel select
  const handleSelect = (e) => {
    setHotelId(e.target.value);
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    if (!info.title || !info.price) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!rooms) {
      alert("Please enter at least one room number.");
      return;
    }

    if (!hotelId) {
      alert("Please select a hotel.");
      return;
    }

    // Parse room numbers into array of objects
    const roomNumbers = rooms
      .split(",")
      .map((num) => ({ number: num.trim() }))
      .filter((r) => r.number !== "");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8800/api/rooms/${hotelId}`,
        { ...info, roomNumbers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Room created successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {/* Room inputs */}
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Room numbers textarea */}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={handleRoomChange}
                  placeholder="Give comma-separated room numbers (e.g. 101,102,201)"
                />
              </div>

              {/* Hotel select */}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={handleSelect} value={hotelId}>
                  <option value="">Select a hotel</option>
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>

              {/* Submit */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
