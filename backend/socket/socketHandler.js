export const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    // Optional: You can track user joins if needed
    socket.on("join_board", (userId) => {
      console.log(`👤 User ${userId} joined`);
      socket.join("main_board");
    });

    // Optional: Custom event example
    socket.on("send_custom_event", (data) => {
      io.to("main_board").emit("receive_custom_event", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
