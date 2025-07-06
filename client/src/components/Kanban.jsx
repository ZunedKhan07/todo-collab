import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Kanban = ({ status, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        background: isOver ? "#d6f5d6" : "#f4f4f4",
        padding: "1rem",
        borderRadius: "10px",
        minHeight: "400px",
        transition: "background 0.3s ease",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{status}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Kanban;
