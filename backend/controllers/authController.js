import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received:", { name, email, password }); // 🔍 Check incoming

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "Email already registered" });

    const user = await User.create({ name, email, password });

    console.log("User created:", user); // 🔍 Confirm creation

    const token = generateToken(user._id);
    console.log("Generated token:", token); // 🔍 Confirm token

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // Add this if not in production (for localhost testing)
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        msg: "Registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // ✅ Important log
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // 🔁 keep false for localhost
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        msg: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "Logged out successfully" });
};

// Get current logged-in user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ user });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email _id");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
  }
};
