import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { hotelColumns } from "../../datatablesource";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  /*const {data, loading, error} = useFetch("/$${path}")*/

   useEffect(() => {
    setList(data);
  }, [data]);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError({ message: "No token found. Please log in first." });
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8800/api/${path}`, {
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

    fetchData();
  }, [token, path]);

const handleDelete = async (id, hotelId) => {
  try {
    let url = `http://localhost:8800/api/${path}/${id}`;
    if (path === "rooms") url += `/${hotelId}`; // rooms need hotelId

    await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setList(list.filter((item) => item._id || item.id ? (item._id || item.id) !== id : true));
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
  }
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
  onClick={() =>
  path === "rooms"
    ? handleDelete(params.row._id || params.row.id, params.row.hotelId)
    : handleDelete(params.row._id || params.row.id)
}

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
          getRowId={(row) => row._id || row.id}
        />
      )}
    </div>
  );
};

export default Datatable;