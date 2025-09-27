import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import vehiclesRoute from "./routes/vehicles.js";
import companiesRouter from "./routes/companies.js";
import carBookingRoutes from "./routes/carBookings.js";
import hotelBookingsRoute from "./routes/hotelBookings.js";
import restaurantsRouter from "./routes/restaurants.js";
import restaurantReservationsRoutes from "./routes/restaurantBooking.js";

dotenv.config();
const app = express();

//  Allow both frontend ports (3000 and 3001)
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: allowedOrigins, // allow both frontend apps
    credentials: true,
  })
);

//  Middleware
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

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/vehicles", vehiclesRoute);
app.use("/api/companies", companiesRouter);
app.use("/api/car-bookings", carBookingRoutes);
app.use("/api/hotel-bookings", hotelBookingsRoute);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/restaurant-reservations", restaurantReservationsRoutes);

//  Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start server
app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
