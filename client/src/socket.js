import { io } from "socket.io-client";

// ✅ Connect to backend, not frontend
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
