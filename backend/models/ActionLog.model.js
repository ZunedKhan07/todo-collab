import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ["create", "update", "delete", "assign", "move"],
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export const ActionLog = new mongoose.model("ActionLog", actionLogSchema)