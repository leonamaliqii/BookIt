import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import { SearchContext } from "./context/SearchContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CarRentals from "./pages/carRentals/CarRentals";
import CompanyVehicles from "./pages/companyVehicles/CompanyVehicles";
import CarBooking from "./pages/carBooking/CarBooking";
import HotelBooking from "./pages/hotelBooking/HotelBooking";
import Restaurant from "./pages/restaurant/Restaurant.jsx";
import RestaurantDetail from "./pages/restaurantDetail/RestaurantDetail";
import RestaurantBooking from "./pages/restaurantBooking/RestaurantBooking";
import Attractions from "./pages/attractions/Attractions";


// inside <Routes>
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hotels" element={<List/>} />
        <Route path="/hotels/:id" element={<Hotel/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="register" element={<Register />} />
         <Route path="/rentals" element={<CarRentals />} />
         <Route path="/rentals/:companyId" element={<CompanyVehicles />} />
          <Route path="/book/car/:vehicleId" element={<CarBooking />} />
        <Route path="/hotel-booking" element={<HotelBooking />} />
    <Route path="/restaurants" element={<Restaurant />} />
    <Route path="/restaurants/:id" element={<RestaurantDetail />} />
<Route path="/restaurant-booking" element={<RestaurantBooking />} />
<Route path="/attractions" element={<Attractions />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


