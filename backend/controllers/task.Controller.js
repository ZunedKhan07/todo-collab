import { Task } from "../models/Task.model.js";

// Create a Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedUser } = req.body;

    // Check for duplicate title (optional)
    const existing = await Task.findOne({ title });
    if (existing) {
      return res.status(400).json({ msg: "Task title already exists" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      assignedUser,
    });

    res.status(201).json({ msg: "Task created", task });
  } catch (err) {
    res.status(500).json({ msg: "Error creating task", err });
  }
};

// Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedUser", "name email");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks", err });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) return res.status(404).json({ msg: "Task not found" });

    res.status(200).json({ msg: "Task updated", task: updatedTask });
  } catch (err) {
    res.status(500).json({ msg: "Error updating task", err });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ msg: "Task not found" });

    res.status(200).json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task", err });
  }
};

// 🎯 Smart Assign Task Controller
export const smartAssignTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // 1. Get all users
    const users = await User.find();

    if (users.length === 0) {
      return res.status(400).json({ msg: "No users found to assign task" });
    }

    // 2. Count active tasks (status ≠ 'Done') for each user
    const userTaskCounts = await Promise.all(
      users.map(async (user) => {
        const count = await Task.countDocuments({
          assignedUser: user._id,
          status: { $ne: "Done" },
        });
        return { user, count };
      })
    );

    // 3. Sort users by task count ascending
    userTaskCounts.sort((a, b) => a.count - b.count);
    const leastBusyUser = userTaskCounts[0].user;

    // 4. Create and assign task
    const newTask = await Task.create({
      title,
      description,
      priority,
      assignedUser: leastBusyUser._id,
      status: "Todo"
    });

    res.status(201).json({
      msg: "Task smart-assigned successfully",
      task: newTask,
      assignedTo: {
        name: leastBusyUser.name,
        email: leastBusyUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Smart assign failed", err });
  }
};