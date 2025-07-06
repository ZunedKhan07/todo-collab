import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import axios from "../axios";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleSmartAssign = async (taskId) => {
    try {
      await axios.put(`/tasks/${taskId}/smart-assign`);
      dispatch(fetchTasks());
    } catch (err) {
      alert("Smart assign failed");
    }
  };

  return (
    <div
      ref={drag}
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: isDragging ? "0 0 10px #333" : "0 2px 5px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        transition: "all 0.2s ease",
      }}
    >
      <h4>{task.title}</h4>
      <p style={{ fontSize: "14px" }}>{task.description}</p>
      <p style={{ fontSize: "12px", color: "gray" }}>Priority: {task.priority}</p>

      {/* Assigned user dropdown */}
      <select
        style={{ marginTop: "10px", fontSize: "13px", padding: "4px" }}
        defaultValue={task.assignedUser || ""}
      >
        <option value="">-- Assign User --</option>
        <option value="User1">User1</option>
        <option value="User2">User2</option>
      </select>

      {/* Smart Assign Button */}
      <button
        onClick={() => handleSmartAssign(task._id)}
        style={{
          fontSize: "12px",
          marginTop: "6px",
          background: "#e6f7ff",
          border: "1px solid #91d5ff",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        🔀 Smart Assign
      </button>
    </div>
  );
};

export default TaskCard;
