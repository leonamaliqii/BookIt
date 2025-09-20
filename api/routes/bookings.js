import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
