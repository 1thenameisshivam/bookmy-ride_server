import mongoose from "mongoose";
import { DB_URL } from "../utils/constant.js";
const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed");
  }
};

export default dbConnection;
