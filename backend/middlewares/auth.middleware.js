import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ msg: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
