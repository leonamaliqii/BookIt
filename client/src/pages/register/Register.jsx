import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(null); // Clear error while typing
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (credentials.username.length < 2) {
      setError({ message: "Username must be at least 2 characters long" });
      return;
    }

    if (!credentials.email.includes("@")) {
      setError({ message: "Email must be valid and contain '@'" });
      return;
    }

    if (credentials.password.length < 7) {
      setError({ message: "Password must be at least 7 characters long" });
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", credentials);
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      setError(err.response?.data || { message: "Something went wrong" });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2>Register</h2>
        <input
          className="lInput"
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="lInput"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="lInput"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button className="lButton" onClick={handleClick}>
          Register
        </button>
        {error && <span className="error">{error.message}</span>}
        <p className="register">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
