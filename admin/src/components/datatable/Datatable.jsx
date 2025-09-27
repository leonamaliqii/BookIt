

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Sync data with list
  useEffect(() => {
    setList(data);
  }, [data]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError({ message: "No token found. Please log in first." });
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8800/api/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
           withCredentials: true,
        });
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || { message: "Something went wrong" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, path]);

  // Handle delete
  const handleDelete = async (id, hotelId) => {
    try {
      let url = `http://localhost:8800/api/${path}/${id}`;
      if (path === "rooms") url += `/${hotelId}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update list after deletion
      setList(list.filter((item) => {
        const itemId = item._id || item.id; // works for both _id (Mongo) and id (PostgreSQL)
        return itemId !== id;
      }));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  // Action column
// Action column: View, Edit, Delete
const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 250, // increase width for the extra button
    renderCell: (params) => {
      const itemId = params.row._id || params.row.id; // works for both Mongo (_id) and PostgreSQL (id)
      return (
        <div className="cellAction">
          {/* View button: goes to single item page */}
          <Link to={`/${path}/${itemId}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>

          {/* Edit button: goes to update page */}
          <Link to={`/${path}/update/${itemId}`} style={{ textDecoration: "none" }}>
            <div className="editButton">Edit</div>
          </Link>

          {/* Delete button: calls handleDelete */}
          <div
            className="deleteButton"
            onClick={() =>
              path === "rooms"
                ? handleDelete(itemId, params.row.hotelId)
                : handleDelete(itemId)
            }
          >
            Delete
          </div>
        </div>
      );
    },
  },
];


  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error.message}</div>}

      {loading ? (
        <div>Loading ...</div>
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id || row.id} // works for Mongo (_id) and PostgreSQL (id)
        />
      )}
    </div>
  );
};

export default Datatable;
