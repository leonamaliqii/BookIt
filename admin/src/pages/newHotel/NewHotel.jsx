import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../fromSource";
import useFetch from "../../hooks/useFetch";

const NewHotel = () => {
  const [files, setFiles] = useState([]); // multiple images
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  // Fetch available rooms from backend
  const { data, loading, error } = useFetch("http://localhost:8800/api/rooms");

  // Handle form input changes
  const handleChange = (e) => {
    const value =
      e.target.value === "true"
        ? true
        : e.target.value === "false"
        ? false
        : e.target.value;
    setInfo((prev) => ({ ...prev, [e.target.id]: value }));
  };

  // Handle multi-select rooms
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ["name", "type", "city", "address", "cheapestPrice"];
    for (let field of requiredFields) {
      if (!info[field]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }

    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    if (rooms.length === 0) {
      alert("Please select at least one room.");
      return;
    }

    try {
      // Upload images to Cloudinary
      const list = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload"); // unsigned preset
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dicr6ysyv/image/upload",
            data
          );
          return uploadRes.data.secure_url;
        })
      );

      // Prepare hotel object
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      // Include JWT token
      const token = localStorage.getItem("token");

      // Send hotel to backend
      await axios.post("http://localhost:8800/api/hotels", newHotel, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Hotel created successfully!");
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong. Check console for details. Make sure backend is running and schema is correct."
      );
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {/* Image Upload */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  style={{ display: "none" }}
                />
              </div>

              {/* Hotel Inputs */}
              {hotelInputs.map((input) => (
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

              {/* Featured */}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* Rooms Selection */}
              <div className="selectRooms formInput">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading..."
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
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

export default NewHotel;
