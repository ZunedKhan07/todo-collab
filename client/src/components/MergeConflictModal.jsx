import React from "react";

const MergeConflictModal = ({ conflictData, onMerge, onOverwrite, onClose }) => {
  if (!conflictData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Conflict Detected</h3>
        <p>Another version of this task exists.</p>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={onMerge}>🔀 Merge</button>
          <button onClick={onOverwrite} style={{ margin: "0 10px" }}>
            🚫 Overwrite
          </button>
          <button onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default MergeConflictModal;
