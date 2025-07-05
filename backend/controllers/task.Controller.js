import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";
import { logAction } from "../utils/logAction.js";

// 🔹 Create Task Controller
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

    await logAction({
      actionType: "create",
      taskId: newTask._id,
      userId: req.user.id,
    });

    // ✅ Emit event to all clients
    const io = req.app.get("io");
    io.emit("task_created", newTask);

    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create task", err });
  }
};

// 🔹 Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedUser", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks", err });
  }
};

// 🔹 Update Task Controller
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedUser } = req.body;

    const invalidTitles = ["Todo", "In Progress", "Done"];
    if (title && invalidTitles.includes(title.trim())) {
      return res.status(400).json({ msg: "Task title cannot be a column name" });
    }

    if (title) {
      const existing = await Task.findOne({ title: title.trim(), _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ msg: "Task title must be unique" });
      }
    }

  const updatedTask = await Task.findByIdAndUpdate(
  id,
  {
    title,
    description,
    status,
    priority,
    assignedUser,
    lastUpdatedBy: req.user.id,
    updatedAt: Date.now(),
  },
  { new: true }
);


    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await logAction({
      actionType: "update",
      taskId: updatedTask._id,
      userId: req.user.id,
    });

    // Emit update event
    const io = req.app.get("io");
    io.emit("task_updated", updatedTask);

    res.status(200).json({ msg: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update task", err });
  }
};

// 🔹 Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ msg: "Task not found" });

    await logAction({
      actionType: "delete",
      taskId: deleted._id,
      userId: req.user.id,
    });

    // ✅ Emit delete event
    const io = req.app.get("io");
    io.emit("task_deleted", deleted);

    res.status(200).json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task", err });
  }
};

// 🔹 Smart Assign Task
export const smartAssignTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const users = await User.find();
    if (users.length === 0) {
      return res.status(400).json({ msg: "No users found to assign task" });
    }

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

    const newTask = await Task.create({
      title,
      description,
      priority,
      assignedUser: leastBusyUser._id,
      status: "Todo",
    });

    await logAction({
      actionType: "assign",
      taskId: newTask._id,
      userId: req.user.id,
    });

    // Emit task_created event
    const io = req.app.get("io");
    io.emit("task_created", newTask);

    res.status(201).json({
      msg: "Task smart-assigned successfully",
      task: newTask,
      assignedTo: {
        name: leastBusyUser.name,
        email: leastBusyUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Smart assign failed", err });
  }
};
