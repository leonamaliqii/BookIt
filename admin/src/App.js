import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/newcopy/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./fromSource";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // adjust path to your context
import { userColumns } from "./datatablesource";
import { hotelColumns } from "./datatablesource";



function App() {
  
  const ProtectedRoute = ({children}) =>{
    const {user} = useContext(AuthContext)

      if(!user){
        return <Navigate to = "/login"/>
      }
      return children;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
           <Route path="login" element={<Login />} />
            <Route index element={
              <ProtectedRoute>
               <Home />
              </ProtectedRoute>
              } />
            
            <Route path="users">
              <Route index element={   <ProtectedRoute>
               <List columns = {userColumns} />
              </ProtectedRoute>} />
              <Route path=":userId" element={   <ProtectedRoute>
               <Single />
              </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User"/></ProtectedRoute>}
              />
            </Route>
            <Route path="hotels">
              <Route index element={
                <ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute>
                <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={
                <ProtectedRoute>
                  <New inputs={productInputs} title="Add New Product" />
                  </ProtectedRoute>
                }
                  />
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;