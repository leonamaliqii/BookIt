export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const vehicleColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "companyId", headerName: "Company ID", width: 100 },
  { field: "brand", headerName: "Brand", width: 150 },
  { field: "model", headerName: "Model", width: 150 },
  { field: "year", headerName: "Year", width: 100 },
  { field: "pricePerDay", headerName: "Price/Day", width: 120 },
];

export const restaurantColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "city", headerName: "City", width: 120 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "rating", headerName: "Rating", width: 100 },
];
