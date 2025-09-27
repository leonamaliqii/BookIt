import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// CREATE
export const createHotel = async (req, res, next) => {
  console.log("Received hotel data:", req.body); // <--- see what frontend sends
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    console.error("Error creating hotel:", err); // <--- log exact Mongoose error
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET SINGLE HOTEL
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET ALL HOTELS 
export const getAllHotels = async (req, res, next) => {
  const { min, max, city, ...others } = req.query;

  const priceFilter = {
    $gte: min ? Number(min) : 0,
    $lte: max ? Number(max) : 9999,
  };

  const cityFilter = city ? { city: city } : {}; // exact match

  try {
    const hotels = await Hotel.find({
      ...others,
      ...cityFilter,
      cheapestPrice: priceFilter,
    }).limit(req.query.limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT BY CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map(city => Hotel.countDocuments({ city: city })) 
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// GET HOTEL ROOMS
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
