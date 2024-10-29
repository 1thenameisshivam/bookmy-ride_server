import express from "express";
import { lockSeats } from "../controller/seatLocking.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getSessionId } from "../controller/getSessionId.controller.js";
import { varifyPayment } from "../controller/varifyPayment.controller.js";
const bookingRouter = express.Router();

bookingRouter.post("/lock_seat", isAuthenticated, lockSeats);
bookingRouter.post("/get_session_id", isAuthenticated, getSessionId);
bookingRouter.post("/varify", isAuthenticated, varifyPayment);
export default bookingRouter;
