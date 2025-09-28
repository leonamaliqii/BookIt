import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER NEW USER (same for admin & client)
export const register = async (req, res) => {
  try {
    const { username = "", email = "", password = "", isAdmin = false } = req.body;

    if (username.length < 2)
      return res.status(400).json({ message: "Username must be at least 2 characters long" });
    if (!email.includes("@"))
      return res.status(400).json({ message: "Email must be valid and contain '@'" });
    if (password.length < 7)
      return res.status(400).json({ message: "Password must be at least 7 characters long" });

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    const savedUser = await newUser.save();

    const { password: pwd, ...userDetails } = savedUser._doc;
    return res.status(201).json(userDetails);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// CLIENT LOGIN (no admin check)
export const login = async (req, res) => {
  try {
    const { username = "", password = "" } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Wrong password!" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT || "secretkey", {
      expiresIn: "30d",
    });

    const { password: pwd, ...userDetails } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      details: userDetails,
      accessToken: token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ADMIN LOGIN (checks isAdmin)
export const loginAdmin = async (req, res) => {
  try {
    const { username = "", password = "" } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Wrong password!" });

    if (!user.isAdmin) return res.status(403).json({ message: "You are not admin!" });

    const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT || "secretkey", {
      expiresIn: "30d",
    });

    const { password: pwd, ...userDetails } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ details: userDetails, accessToken: token, isAdmin: true });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
