import "./navbar.css";
import {Link} from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">BookIt</span>
        </Link>
        <div className="navItems">
          <Link to="/register" style={{color:"inherit", textDecoration:"none"}}>
            <button className="navButton">Register</button>
          </Link>
          <Link to="/login" style={{color:"inherit", textDecoration:"none"}}>
            <button className="navButtsson">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


