import express from "express";
import { lockSeats } from "../controller/seatLocking.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getSessionId } from "../controller/getSessionId.controller.js";
import { varifyPayment } from "../controller/varifyPayment.controller.js";
import { getUserBookedSeats } from "../controller/getUserBookedSeats.js";
import limiter from "../../middleware/rateLimit.js";
const bookingRouter = express.Router();

bookingRouter.post("/lock_seat", limiter, isAuthenticated, lockSeats);
bookingRouter.post("/get_session_id", limiter, isAuthenticated, getSessionId);
bookingRouter.post("/varify", limiter, isAuthenticated, varifyPayment);
bookingRouter.get("/booked_seats", isAuthenticated, getUserBookedSeats);
export default bookingRouter;
