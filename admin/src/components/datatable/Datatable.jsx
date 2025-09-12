import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError({ message: "No token found. Please log in first." });
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8800/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || { message: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = (id) => {
    // Optional: implement delete functionality here
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error.message}</div>}

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <DataGrid
          className="datagrid"
          rows={data || []}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;