// src/socket.js
import { io } from "socket.io-client";

// Backend server URL (adjust if deployed)
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
