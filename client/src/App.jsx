import { useEffect } from "react";
import socket from "./socket";
import React from "react";

function App() {
  useEffect(() => {
    // Server connected
    socket.on("connect", () => {
      console.log("🟢 Connected to server:", socket.id);
    });

    // Event listeners
    socket.on("task_created", (task) => {
      console.log("📥 Task Created:", task);
    });

    socket.on("task_updated", (task) => {
      console.log("✏️ Task Updated:", task);
    });

    socket.on("task_deleted", (task) => {
      console.log("❌ Task Deleted:", task);
    });

    // Disconnected
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧪 Real-Time Task Event Tester</h1>
      <p>Check your browser console (F12) for live logs.</p>
    </div>
  );
}

export default App;
