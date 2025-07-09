import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import axios from "../../axios";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/auth/all-users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // ✅ Smart assign API
  const handleSmartAssign = async () => {
    try {
      await axios.put(`/tasks/${task._id}/smart-assign`);
      dispatch(fetchTasks());
    } catch (err) {
      alert("Smart assign failed");
      console.error("Smart assign error:", err);
    }
  };

  // ✅ Manual assign API (FIXED endpoint here)
  const handleAssignUser = async (taskId, userId) => {
    try {
      if (!userId) return;
      await axios.put(`/tasks/${taskId}/assign`, { assignedUser: userId });
      dispatch(fetchTasks());
    } catch (err) {
      console.error("❌ Manual assign failed:", err);
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

      <select
        style={{ marginTop: "10px", fontSize: "13px", padding: "4px" }}
        value={task.assignedUser || ""}
        onChange={(e) => handleAssignUser(task._id, e.target.value)}
      >
        <option value="">-- Assign User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSmartAssign}
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
