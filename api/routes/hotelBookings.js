import express from "express";
import HotelBooking from "../models/HotelBooking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { hotelId, rooms, startDate, endDate, totalPrice, userId, firstName, lastName } = req.body;

    const newBooking = new HotelBooking({
      hotelId,
      rooms,
      startDate,
      endDate,
      totalPrice,
      userId,
      firstName,
      lastName,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
