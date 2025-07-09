import React, { useState } from "react";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import ActivityLog from "../components/Logs/ActivityLog";
import Navbar from "../components/UI/Navbar";
import AddTaskModal from "../components/Kanban/AddTaskModal"; // 👈 Modal Import

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); // 👈 State for modal toggle

  return (
    <div>
      <Navbar />

      {/* Add Task Button */}
      <div style={{ padding: "10px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Modal Component */}
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}

      {/* Main Kanban + Logs */}
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
