import "./login.css";
import { useContext, useState, useEffect, use } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const {  loading, error, dispatch } = useContext(AuthContext);

  const navigate =  useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log("Logged in user:", res.data);
        navigate("/");
    } catch (err) {
      console.log("Error response:", err.response?.data);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Something went wrong" },
      });
    }
  };

  useEffect(() => {
    if (error) {
      const clearError = () =>
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      document.getElementById("username").addEventListener("input", clearError);
      document.getElementById("password").addEventListener("input", clearError);
      return () => {
        document
          .getElementById("username")
          .removeEventListener("input", clearError);
        document
          .getElementById("password")
          .removeEventListener("input", clearError);
      };
    }
  }, [error, dispatch]);

  return (
    <div className="login">
      <div className="lContainer">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput"
        />

        <div className="lOptions">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>

        <button onClick={handleClick} className="lButton" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <span style={{ color: "red", marginTop: "10px", display: "block" }}>
            {error.message}
          </span>
        )}

        <p className="register">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;