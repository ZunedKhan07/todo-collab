import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus } from "../redux/slices/taskSlice";
import KanbanColumn from "../components/KanbanColumn";
import ActivityLog from "../components/ActivityLog";
import MergeConflictModal from "../components/MergeConflictModal";
import socket from "../socket";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [conflictData, setConflictData] = useState(null);

  const columns = ["Todo", "In Progress", "Done"];

  useEffect(() => {
    dispatch(fetchTasks());

    // Listen for conflict event from server
    socket.on("task-conflict", (conflict) => {
      setConflictData(conflict);
    });

    return () => {
      socket.off("task-conflict");
    };
  }, [dispatch]);

  const handleDrop = (taskId, newStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const handleResolveConflict = (resolvedTask) => {
    dispatch(updateTaskStatus({ id: resolvedTask._id, status: resolvedTask.status }));
    setConflictData(null);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Kanban Columns */}
      <div className="kanban-container" style={{ flex: 3 }}>
        {columns.map((col) => (
          <KanbanColumn
            key={col}
            status={col}
            tasks={Array.isArray(tasks) ? tasks.filter((t) => t.status === col) : []}
            onDrop={handleDrop}
          />
        ))}
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
      </div>

      {/* Activity Log Panel */}
      <div style={{ flex: 1, padding: "1rem", borderLeft: "1px solid #ccc", background: "#fafafa" }}>
        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>📝 Activity Log</h4>
        <ActivityLog />
      </div>

      {/* Merge Conflict Modal */}
      {conflictData && (
        <MergeConflictModal
          conflict={conflictData}
          onClose={() => setConflictData(null)}
          onResolve={handleResolveConflict}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
