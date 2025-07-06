import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import KanbanBoard from "./KanbanBoard";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      dispatch(setUser({ user: res.data.user, token: res.data.token }));

      navigate("/KanbanBoard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
        Not registered yet?{" "}
        <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Register first
        </Link>{" "}
        to continue.
      </p>
    </div>
  );
}

export default Login;
