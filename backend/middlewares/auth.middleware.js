import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: Invalid user" });
    }

    req.user = user; // attaching user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
  }
};
