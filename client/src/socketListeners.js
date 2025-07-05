import socket from "./socket";

export const setupSocketListeners = () => {
  // Connected
  socket.on("connect", () => {
    console.log("🟢 Connected to server:", socket.id);
  });

  // Events
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
};

export const cleanupSocketListeners = () => {
  socket.off("connect");
  socket.off("disconnect");
  socket.off("task_created");
  socket.off("task_updated");
  socket.off("task_deleted");
};
