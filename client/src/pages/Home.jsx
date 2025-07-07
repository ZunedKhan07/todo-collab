import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Auth/Login";

const Home = () => {
  return (
    <div className="home-page">
      <div className="left-panel">
        <h1>Real-Time Collaborative To-Do Board</h1>
        <p>Stay synced. Stay productive. Smartly manage tasks with your team.</p>
        <Link to="/register">Don’t have an account? Register</Link>
      </div>
      <div className="right-panel">
        <Login />
      </div>
    </div>
  );
};

export default Home;
