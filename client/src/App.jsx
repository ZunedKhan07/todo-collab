import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./redux/slices/taskSlice";
import { fetchLogs } from "./redux/slices/logSlice";
import { io } from "socket.io-client";
import { setSocket } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchLogs());

    const socket = io(import.meta.env.VITE_SOCKET_URL);
    dispatch(setSocket(socket));

    socket.on("tasksUpdated", () => dispatch(fetchTasks()));
    socket.on("logsUpdated", () => dispatch(fetchLogs()));

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
      </Routes>
    </Router>
  );
};

export default App;