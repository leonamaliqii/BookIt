// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

// REGISTER NEW USER
export const register = async (req, res, next) => {
  try {
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false, // default false
    });

    const savedUser = await newUser.save();

    // Remove password before sending response
    const { password, ...userDetails } = savedUser._doc;

    res.status(201).json(userDetails);
  } catch (err) {
    next(err);
  }
};

// LOGIN USER
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT, // your secret key from .env
      { expiresIn: "1d" }
    );

    // Remove password from response
    const { password, ...userDetails } = user._doc;

    // Send response with token and user details
    res.status(200).json({
      details: userDetails,
      accessToken: token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    next(err);
  }
};