import React, { useEffect, useState } from "react";
import socket from "../socket";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("log_updated", (newLog) => {
      setLogs((prevLogs) => {
        const updated = [newLog, ...prevLogs];
        return updated.slice(0, 20);
      });
    });
    
    fetch("/api/v1/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));

    return () => socket.off("log_updated");
  }, []);

  return (
    <div style={{ padding: "1rem", borderLeft: "1px solid #ccc", width: "300px" }}>
      <h4>📝 Activity Log</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log, index) => (
          <li key={index} style={{ marginBottom: "0.5rem", fontSize: "14px" }}>
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
