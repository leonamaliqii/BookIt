import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Middleware to read JSON in requests
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

// MongoDB connection status logs
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute); // ✅ hotels route fixed
app.use("/api/rooms", roomsRoute);

app.use((err,req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({ 
      success:false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
  });
})
// Start server
app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
