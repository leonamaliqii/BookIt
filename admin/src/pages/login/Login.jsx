import "./login.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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

      console.log("Logged in user:", res.data);

      const userDetails = {
        ...res.data.details,
        isAdmin: res.data.isAdmin, // marr nga backend
      };

      // Vetëm admin mund të hyjë
      if (userDetails.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userDetails });

        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(userDetails));

        navigate("/"); // redirect te dashboard
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not admin!" },
        });
      }
    } catch (err) {
      console.log("Error response:", err.response?.data);

      // Trajto gabime sipas status
      if (err.response?.status === 403) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not admin!" },
        });
      } else if (err.response?.status === 400 || err.response?.status === 404) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Wrong username or password!" },
        });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Something went wrong" },
        });
      }
    }
  };

  useEffect(() => {
    if (error) {
      const clearError = () => dispatch({ type: "LOGIN_FAILURE", payload: null });
      document.getElementById("username").addEventListener("input", clearError);
      document.getElementById("password").addEventListener("input", clearError);

      return () => {
        document.getElementById("username").removeEventListener("input", clearError);
        document.getElementById("password").removeEventListener("input", clearError);
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
