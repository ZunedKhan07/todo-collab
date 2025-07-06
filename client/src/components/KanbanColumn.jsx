import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ status, tasks, onDrop }) => {
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
        padding: "1rem",
        minHeight: "500px",
        background: isOver ? "#dff0d8" : "#f4f4f4",
        borderRadius: "10px",
        transition: "background 0.3s ease-in-out",
      }}
    >
      <h3 style={{ textAlign: "center" }}>{status}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default KanbanColumn;
