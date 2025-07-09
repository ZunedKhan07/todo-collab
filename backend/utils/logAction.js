import { Log } from "../models/Log.model.js";

export const logAction = async ({ actionType, taskId, userId }) => {
  try {
    console.log("🪵 Logging Action:", { actionType, taskId, userId });
    if (!userId) throw new Error("Missing userId in logAction");

    await Log.create({
      actionType,
      task: taskId,
      user: userId,
      timestamp: new Date(),
    });

    console.log("✅ Action logged successfully");
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
};
