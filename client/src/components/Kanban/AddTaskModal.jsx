import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/slices/taskSlice";

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status: "Todo", // default
      assignedUser: user?._id,
      priority: "Medium",
    };

    dispatch(createTask(taskData));

    setTitle("");
    setDescription("");
  };

  return (
    <div style={{ padding: "20px", background: "#eee", borderRadius: "8px", marginBottom: "20px" }}>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ padding: "8px", width: "100%", height: "80px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px", background: "#333", color: "#fff" }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
