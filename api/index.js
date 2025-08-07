import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
const app = express();
dotenv.config();


const connect = async () => {
try {
  await mongoose.connect(process.env.MONGO);
  console.log("Connected to MongoDB.");
} catch (error) {
  throw error;
}
};

//kur lidhja me db shkeputet, na del mesazhi me poshte
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});
 
//middleware
//kur bojm kerkesa ne kete endpoint, e perdor authRoute
app.use("/auth" ,authRoute);
app.use("/users" ,usersRoute);
app.use("/hotels" ,hotelsRoute);
app.use("/rooms" ,roomsRoute);

//start the server and listen to requests on port 3000
app.listen(3000, () => {
    connect();
    console.log("Connected to backend.");//konfirmon qe serveri ka filluar dhe eshte i gatshëm te pranoj kerkesa
    
}); 
