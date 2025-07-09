import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  actionType: {
    type: String,
    enum: ["create", "update", "delete", "assign"],
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Log = mongoose.model("Log", logSchema);
