import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import axios from "../axios"; 
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      dispatch(setUser({ user: res.data.user, token: res.data.token }));

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="login-box">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Login here
        </Link>
        .
      </p>
    </div>
  );
}

export default Register;
