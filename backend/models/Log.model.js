import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      enum: ["create", "update", "delete", "assign"],
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);
