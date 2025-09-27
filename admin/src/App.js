import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/newcopy/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import NewRestaurant from "./pages/newRestaurant/NewRestaurant";
import NewCompany from "./pages/newCompany/NewCompany";
import UpdateCompany from "./pages/updateCompany/UpdateCompany";
import { productInputs, userInputs } from "./fromSource";
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
    if (!user) {
      return <Navigate to="/login" />;
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
              path=":userId"
              element={
                <ProtectedRoute>
                  <Single />
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
              path=":hotelId"
              element={
                <ProtectedRoute>
                  <Single />
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
              path=":roomId"
              element={
                <ProtectedRoute>
                  <Single />
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
          </Route>

          {/* Vehicles */}
          <Route path="vehicles">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={vehicleColumns} />
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
