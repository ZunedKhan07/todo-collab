import { ActionLog } from "../models/ActionLog.model.js";

export const logAction = async ({ actionType, taskId, userId }) => {
  try {
    await ActionLog.create({
      actionType,
      taskId,
      userId,
    });
  } catch (error) {
    console.error("❌ Failed to log action:", error.message);
  }
};
