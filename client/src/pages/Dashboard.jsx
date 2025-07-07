import React from "react";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import ActivityLog from "../components/Logs/ActivityLog";
import Navbar from "../components/UI/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}>
          <KanbanBoard />
        </div>
        <div style={{ flex: 1, maxWidth: "300px", marginLeft: "10px" }}>
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
