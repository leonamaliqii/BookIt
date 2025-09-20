import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  itemId: {
    type: String, // can hold car ID (from Postgres) or hotel ID (from Mongo)
    required: true,
  },
  itemType: {
    type: String, // "car" or "hotel"
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numDays: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  userId: { type: String, required: true }, // from Auth
  userName: { type: String },
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
