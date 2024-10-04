import express from "express";
import dbConnection from "./src/config/dbConnection.js";
import mongoose from "mongoose";
import { PORT } from "./src/utils/constant.js";
import userRouter from "./src/auth/routes/user.routes.js";
import cors from "cors";
import { FRONTEND_URL } from "./src/utils/constant.js";
import cookieParser from "cookie-parser";
import tripRouter from "./src/trip/routes/trips.routes.js";
const app = express();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/trip", tripRouter);

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

// Handle graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
});
