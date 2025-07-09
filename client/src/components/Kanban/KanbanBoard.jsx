import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const dispatch = useDispatch();

  // 🛡 Safe fallback in case tasks is undefined
  const { tasks = [] } = useSelector((state) => state.tasks || {});

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statuses = ["Todo", "In Progress", "Done"];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {statuses.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
