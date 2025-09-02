import express from 'express';
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import { updateRoomAvailability } from '../controllers/room.js';
import Room from '../models/Room.js';

const router = express.Router();

// CREATE new room 
router.post("/:hotelid", verifyAdmin, createRoom); 

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id",  updateRoomAvailability);

 
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getAllRooms);

export default router;