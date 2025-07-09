import { Log } from "../models/Log.model.js";

export const getLastLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("user", "name email")
      .populate("task", "title");

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch logs", error: err.message });
  }
};
