import "./newRestaurant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewRestaurant = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setInfo((prev) => ({ ...prev, [e.target.id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dicr6ysyv/image/upload",
            data
          );
          return uploadRes.data.secure_url;
        })
      );

      const newRestaurant = {
        ...info,
        photos: list,
      };

      await axios.post("http://localhost:8800/api/restaurants", newRestaurant);
      alert("Restaurant added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add restaurant");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Restaurant</h1>
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
              <div className="formInput">
                <label htmlFor="file">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input id="name" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>City</label>
                <input id="city" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input id="address" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Cuisine</label>
                <input id="cuisine" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea id="description" onChange={handleChange}></textarea>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRestaurant;
