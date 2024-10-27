import express from "express";
import { lockSeats } from "../controller/seatLocking.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";

const bookingRouter = express.Router();

bookingRouter.post("/lock_seat", isAuthenticated, lockSeats);

export default bookingRouter;
