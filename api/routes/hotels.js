import express from 'express';
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';


const router = express.Router();

// CREATE new hotel
router.post("/", createHotel); 
//UPDATE
router.put("/:id", updateHotel);


//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);

 



















export default router;
