import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";


export  const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {  $push: { rooms: savedRoom._id },
     });
  } catch (err) {
    next(err);
  }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//update
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      {"roomNumbers._id": req.params.id},
      {
        $push:{
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
 
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
      await Hotel.findByIdAndUpdate(hotelId, {  $pull: { rooms: req.params.id },
     });
  } catch (err) {
    next(err);
  }
        res.status(200).json("Room has been deleted.");
      } catch (err) {
        next(err); 
      }
}

//get
export const getRoom = async(req, res, next) => {
try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
}
//getall
//getall
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(); // fetch all rooms

    // Attach hotelId to each room
    const roomsWithHotel = await Promise.all(
      rooms.map(async (room) => {
        // Find the hotel that includes this room
        const hotel = await Hotel.findOne({ rooms: room._id });
        return { ...room._doc, hotelId: hotel?._id }; // include hotelId
      })
    );

    res.status(200).json(roomsWithHotel);
  } catch (err) {
    next(err);
  }
};
