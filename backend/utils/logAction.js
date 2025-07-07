import { Log } from "../models/Log.model.js";

export const logAction = async ({ actionType, taskId, userId }) => {
  try {
    await Log.create({ actionType, taskId, userId, timestamp: new Date() });
  } catch (err) {
    console.error("Logging failed", err.message);
  }
};
