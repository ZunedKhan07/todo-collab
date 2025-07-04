import { ActionLog } from "../models/ActionLog.model.js";
import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";

export const getRecentLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .sort({ timestamp: -1 })        // latest first
      .limit(20)
      .populate("userId", "name email")
      .populate("taskId", "title status");

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch logs", err });
  }
};
