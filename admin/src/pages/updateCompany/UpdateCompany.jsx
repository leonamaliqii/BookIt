import "./updateCompany.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCompany = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch company info
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/companies/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfo(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompany();
  }, [companyId, token]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/companies/${companyId}`, info, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Company updated successfully!");
      navigate("/companies");
    } catch (err) {
      console.error(err);
      alert("Failed to update company");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />

        <div className="top">
          <h1>Update Company</h1>
        </div>

        <div className="bottom">
          {/* Left: preview images */}
          <div className="left">
            <img
              src={info.photo || "https://via.placeholder.com/100"}
              alt="Company"
            />
          </div>

          {/* Right: form */}
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name</label>
                <input
                  id="name"
                  type="text"
                  value={info.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>City</label>
                <input
                  id="city"
                  type="text"
                  value={info.city || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Address</label>
                <input
                  id="address"
                  type="text"
                  value={info.address || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  id="description"
                  type="text"
                  value={info.description || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Logo URL</label>
                <input
                  id="logo"
                  type="text"
                  value={info.logo || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Photo URL</label>
                <input
                  id="photo"
                  type="text"
                  value={info.photo || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Phone</label>
                <input
                  id="phone"
                  type="text"
                  value={info.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Update Company</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompany;
