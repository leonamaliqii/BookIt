import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/newcopy/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import NewRestaurant from "./pages/newRestaurant/NewRestaurant";
import NewCompany from "./pages/newCompany/NewCompany";
import NewVehicle from "./pages/newVehicle/NewVehicle";
import UpdateCompany from "./pages/updateCompany/UpdateCompany";
import UpdateUser from "./pages/updateUser/UpdateUser";
import UpdateHotel from "./pages/updateHotel/UpdateHotel"; 
import UpdateRoom from "./pages/updateRoom/UpdateRoom";
import UpdateVehicle from "./pages/updateVehicle/UpdateVehicle";
import UpdateRestaurant from "./pages/updateRestaurant/UpdateResaturant";
import {  userInputs, hotelInputs, roomInputs, vehicleInputs, restaurantInputs } from "./fromSource";
import { 
  roomColumns, 
  userColumns, 
  hotelColumns, 
  vehicleColumns, 
  restaurantColumns,  // <-- comma added
  companyColumns
} from "./datatablesource";

import { AuthContext } from "./context/AuthContext";

function App() {
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Kontrollo nëse user ekziston dhe është admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="login" element={<Login />} />

          {/* Home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Users */}
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              }
            />
  
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
  path="users/update/:id"
  element={
    <ProtectedRoute>
      <UpdateUser inputs={userInputs} title="Update User" />
    </ProtectedRoute>
  }
/>


          {/* Hotels */}
          <Route path="hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>
              }
            />
       
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              }
            />
              <Route
    path="update/:hotelId"
    element={
      <ProtectedRoute>
        <UpdateHotel inputs={hotelInputs} title="Update Hotel" />
      </ProtectedRoute>
    }
  />
</Route>
          

          {/* Rooms */}
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              }
            />
       
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
           <Route
  path="/rooms/update/:roomId"
  element={<UpdateRoom inputs={roomInputs} title="Update Room" />}
/>
</Route>

<Route path="vehicles">
  {/* List of vehicles */}
  <Route
    index
    element={
      <ProtectedRoute>
        <List columns={vehicleColumns} />
      </ProtectedRoute>
    }
  />

  {/* Add new vehicle */}
  <Route
    path="new"
    element={
      <ProtectedRoute>
        <NewVehicle />
      </ProtectedRoute>
    }
  />

  {/* Update vehicle */}
  <Route
    path="update/:vehicleId"
    element={
      <ProtectedRoute>
        <UpdateVehicle inputs={vehicleInputs} title="Update Vehicle" />
      </ProtectedRoute>
    }
  />
</Route>


          {/* Restaurants */}
          <Route path="restaurants">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={restaurantColumns} />
                </ProtectedRoute>
              }
            />
          < Route  path="new"
    element={
      <ProtectedRoute>
        <NewRestaurant />
      </ProtectedRoute>
    }
  />
   <Route
    path="update/:restaurantId"
    element={
      <ProtectedRoute>
        <UpdateRestaurant inputs={restaurantInputs} title="Update Restaurant" />
      </ProtectedRoute>
    }
  />
</Route> 

          {/* Companies */}
  {/* Companies */}
<Route path="companies">
  <Route
    index
    element={
      <ProtectedRoute>
        <List columns={companyColumns} />
      </ProtectedRoute>
    }
  />
  <Route
    path="new"
    element={
      <ProtectedRoute>
        <NewCompany />
      </ProtectedRoute>
    }
  />
  <Route
    path="update/:companyId"
    element={
      <ProtectedRoute>
        <UpdateCompany />
      </ProtectedRoute>
    }
  />
</Route>



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
