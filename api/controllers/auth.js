// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER NEW USER
export const register = async (req, res, next) => {
  try {
    // Make sure req.body exists
    const body = req.body || {};
    const username = body.username || "";
    const email = body.email || "";
    const password = body.password || "";

    // Frontend + backend validation
    if (username.length < 2) {
      return res.status(400).json({ message: "Username must be at least 2 characters long" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Email must be valid and contain '@'" });
    }
    if (password.length < 7) {
      return res.status(400).json({ message: "Password must be at least 7 characters long" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: body.isAdmin || false,
    });

    const savedUser = await newUser.save();

    // Remove password before sending response
    const { password: pwd, ...userDetails } = savedUser._doc;

    return res.status(201).json(userDetails);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN USER
export const login = async (req, res, next) => {
  try {
    const body = req.body || {};
    const username = body.username || "";
    const password = body.password || "";

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT || "secretkey", // fallback secret
      { expiresIn: "30d" }
    );

    const { password: pwd, ...userDetails } = user._doc;


     // Set cookie
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
