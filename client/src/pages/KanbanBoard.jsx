import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const columns = ["Todo", "In Progress", "Done"];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="kanban-container" style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      {columns.map((col) => (
        <div
          key={col}
          className="kanban-column"
          style={{
            flex: 1,
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "10px",
            minHeight: "400px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{col}</h3>

          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <div className="task-list" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {tasks
              .filter((task) => task.status === col)
              .map((task) => (
                <div
                  key={task._id}
                  style={{
                    background: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <h4>{task.title}</h4>
                  <p style={{ fontSize: "14px" }}>{task.description}</p>
                  <p style={{ fontSize: "12px", color: "gray" }}>Priority: {task.priority}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
