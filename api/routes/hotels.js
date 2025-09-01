import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import { get } from 'mongoose';
import { getHotelRooms } from '../controllers/hotel.js';

const router = express.Router();

// CREATE new hotel
router.post("/", verifyAdmin, createHotel); 

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);


//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL 
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
