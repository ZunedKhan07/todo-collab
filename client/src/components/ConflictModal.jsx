import React from "react";

const ConflictModal = ({ localTask, serverTask, onMerge, onOverwrite, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>⚠️ Conflict Detected</h3>
        <p>Someone else updated this task while you were editing.</p>
        <div className="conflict-options">
          <button onClick={() => onMerge(serverTask)}>Merge</button>
          <button onClick={() => onOverwrite(localTask)}>Overwrite</button>
        </div>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ConflictModal;
