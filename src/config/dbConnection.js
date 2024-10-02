import mongoose from "mongoose";
import { DB_URL } from "../utils/constant.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL); // No need for extra options in Mongoose 6+
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};
export default dbConnection;
