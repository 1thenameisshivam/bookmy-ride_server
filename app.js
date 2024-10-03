import express from "express";
import dbConnection from "./src/config/dbConnection.js";
import mongoose from "mongoose";
import { PORT } from "./src/utils/constant.js";
import userRouter from "./src/auth/routes/user.routes.js";
const app = express();

app.use(express.json());
app.use("/user", userRouter);

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
