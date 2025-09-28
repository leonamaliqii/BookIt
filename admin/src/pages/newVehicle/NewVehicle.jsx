
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";

const NewVehicle = () => {
  const [file, setFile] = useState(null); // vehicle photo
  const [info, setInfo] = useState({});
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // fetch companies for the dropdown
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInfo((prev) => ({ ...prev, [e.target.id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = "";
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

      const newVehicle = {
        ...info,
        photo: photoUrl,
      };

      await axios.post("http://localhost:8800/api/vehicles", newVehicle);
      alert("Vehicle added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add vehicle");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Vehicle</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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

              <div className="formInput">
                <label>Brand</label>
                <input id="brand" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Model</label>
                <input id="model" type="text" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Year</label>
                <input id="year" type="number" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Price per Day</label>
                <input id="price_per_day" type="number" onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Company</label>
                <select id="company_id" onChange={handleChange}>
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVehicle;
