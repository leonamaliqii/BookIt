import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateVehicle = ({ inputs, title }) => {
  const { vehicleId } = useParams(); // vehicle ID from URL
  const [file, setFile] = useState(""); // vehicle image
  const [info, setInfo] = useState({}); // vehicle info

  // Fetch current vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/vehicles/${vehicleId}`);
        setInfo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let photoUrl = info.photo || "";

      // Upload new image if selected
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dicr6ysyv/image/upload",
          data
        );
        photoUrl = uploadRes.data.secure_url;
      }

      const updatedVehicle = { ...info, photo: photoUrl };

      await axios.put(`http://localhost:8800/api/vehicles/${vehicleId}`, updatedVehicle);

      alert("Vehicle updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title || "Update Vehicle"}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : info.photo ||
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Vehicle"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Photo: <DriveFolderUploadOutlinedIcon className="icon" />
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

export default UpdateVehicle;
