import React from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import axios from "../../axios";
import { fetchTasks } from "../../redux/slices/taskSlice";

const KanbanColumn = ({ status, tasks }) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "TASK",
    drop: async (item) => {
      try {
        await axios.put(`/tasks/${item.id}`, { status });
        dispatch(fetchTasks());
      } catch (err) {
        console.error("Drag error", err);
      }
    },
  });

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        margin: "0 10px",
        background: "#f4f4f4",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{status}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default KanbanColumn;