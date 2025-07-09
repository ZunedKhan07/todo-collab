import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AuthProvider from "./components/UI/AuthProvider";
import { fetchTasks } from "./redux/slices/taskSlice";
import { fetchLogs } from "./redux/slices/logSlice";
import { useDispatch } from "react-redux";
import socket from "./socket";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchLogs());
    socket.on("tasksUpdated", () => dispatch(fetchTasks()));
    socket.on("logsUpdated", () => dispatch(fetchLogs()));
    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
