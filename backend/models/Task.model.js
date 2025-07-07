import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: { type: String, enum: ["Todo", "In Progress", "Done"], default: "Todo" },
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
