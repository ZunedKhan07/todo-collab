import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#333", color: "#fff" }}>
      <h2 style={{ margin: 0 }}>✅ Collab Kanban</h2>
      <div>
        <span style={{ marginRight: "10px" }}>👤 {user?.name}</span>
        <button onClick={handleLogout} style={{ padding: "5px 10px", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
