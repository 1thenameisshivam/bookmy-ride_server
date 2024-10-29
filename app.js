import express from "express";
import dbConnection from "./src/config/dbConnection.js";
import mongoose from "mongoose";
import { PORT } from "./src/utils/constant.js";
import userRouter from "./src/auth/routes/user.routes.js";
import cors from "cors";
import { FRONTEND_URL } from "./src/utils/constant.js";
import cookieParser from "cookie-parser";
import tripRouter from "./src/trip/routes/trips.routes.js";
import bookingRouter from "./src/Booking/routes/booking.routes.js";
import Trip from "./src/trip/model/trips.model.js";
import events from "events";
const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/trip", tripRouter);
app.use("/book", bookingRouter);
events.EventEmitter.defaultMaxListeners = 15;
const clearExpiredReservations = async () => {
  const currentTime = new Date();
  console.log("Clearing expired reservations...");

  try {
    // Find all trips (we'll filter seats in-code due to the 2D array structure)
    const trips = await Trip.find();

    for (const trip of trips) {
      let hasUpdated = false;

      // Iterate over each row in the 2D seats array
      for (const row of trip.seats) {
        row.forEach((seat) => {
          // Check if reservation is expired
          if (seat.reserved && seat.reservationExpiresAt < currentTime) {
            seat.reserved = false;
            seat.reservedBy = null;
            seat.reservationExpiresAt = null;
            hasUpdated = true; // Flag to save this trip
          }
        });
      }

      if (hasUpdated) {
        trip.markModified("seats"); // Notify Mongoose of the seats array update
        await trip.save();
        console.log(`Expired seats cleared in trip: ${trip._id}`);
      }
    }
  } catch (error) {
    console.error("Error clearing expired reservations:", error);
  }
};

// Run this job every 30 seconds
setInterval(clearExpiredReservations, 30000);

dbConnection()
  .then(() => {
    app.listen(PORT || 4000, () => {
      console.log(`Server is running on port ${PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.error(
      "Server failed to start due to database connection error:",
      error.message
    );
    process.exit(1); // Gracefully exit the server on DB connection failure
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application-specific logging, throwing an error, or exiting the process can be done here
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  console.log("Database connection closed.");
  process.exit(0);
});
