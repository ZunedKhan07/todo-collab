import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";
import { logAction } from "../utils/logAction.js";

// 🚀 Create a task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedUser } = req.body;

    const invalidTitles = ["Todo", "In Progress", "Done"];
    if (invalidTitles.includes(title.trim())) {
      return res.status(400).json({ msg: "Task title cannot be a column name" });
    }

    const existing = await Task.findOne({ title: title.trim() });
    if (existing) {
      return res.status(400).json({ msg: "Task title must be unique" });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description,
      status,
      priority,
      assignedUser,
    });

    await logAction({ actionType: "create", taskId: newTask._id, userId: req.user.id });

    req.app.get("io").emit("task_created", newTask);

    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create task", err });
  }
};

// 🚀 Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedUser", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks", err });
  }
};

// 🚀 Update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedUser } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(assignedUser && { assignedUser }),
        lastUpdatedBy: req.user?.id,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ msg: "Task not found" });

    req.app.get("io").emit("task_updated", updatedTask);
    res.status(200).json({ msg: "Task updated", task: updatedTask });
  } catch (err) {
    res.status(500).json({ msg: "Update failed", err });
  }
};

// 🚀 Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: "Task not found" });

    await logAction({ actionType: "delete", taskId: deleted._id, userId: req.user.id });

    req.app.get("io").emit("task_deleted", deleted);
    res.status(200).json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task", err });
  }
};

// 🚀 Smart assign
export const smartAssignTask = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.find();
    if (!users.length) return res.status(400).json({ msg: "No users available" });

    const userTaskCounts = await Promise.all(
      users.map(async (user) => {
        const count = await Task.countDocuments({
          assignedUser: user._id,
          status: { $ne: "Done" },
        });
        return { user, count };
      })
    );

    userTaskCounts.sort((a, b) => a.count - b.count);
    const leastBusyUser = userTaskCounts[0].user;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { assignedUser: leastBusyUser._id, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ msg: "Task not found" });

    await logAction({ actionType: "assign", taskId: updatedTask._id, userId: req.user?.id || "system" });

    req.app.get("io").emit("task_updated", updatedTask);

    res.status(200).json({
      msg: "Task smart-assigned",
      task: updatedTask,
      assignedTo: {
        name: leastBusyUser.name,
        email: leastBusyUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Smart assign failed", err });
  }
};
