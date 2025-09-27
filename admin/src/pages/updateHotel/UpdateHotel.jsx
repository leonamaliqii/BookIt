import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateHotel = ({ inputs, title }) => {
  const { hotelId } = useParams(); // hotel ID from URL
  const [file, setFile] = useState(""); // hotel image
  const [info, setInfo] = useState({}); // hotel info

  // Fetch current hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8800/api/hotels/find/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = info.img || "";
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dicr6ysyv/image/upload",
          data
        );
        imgUrl = uploadRes.data.secure_url;
      }

      const updatedHotel = { ...info, img: imgUrl };
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8800/api/hotels/${hotelId}`, updatedHotel, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Hotel updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update hotel");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title || "Update Hotel"}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : info.img ||
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    value={info[input.id] || ""}
                  />
                </div>
              ))}

              <button onClick={handleUpdate}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;