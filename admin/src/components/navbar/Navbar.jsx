import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <img
              src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758976404/black-business-woman-icon-white-background-black-business-woman-icon-130556016_xuwfit.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>

        <button
          className="logoutButton"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
