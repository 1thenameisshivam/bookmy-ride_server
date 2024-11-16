import express from "express";
import isAuthorised from "../../middleware/isAuthorised.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { totalRevenue } from "../controller/totalRevenue.controller.js";
import { totalTrips } from "../controller/totalTripsGenerator.js";
import { totalActiveUsers } from "../controller/totalUsers.controller.js";
import { getMonthlyRevenue } from "../controller/getMonthlyRevenue.controller.js";
import { makeAdmin } from "../controller/makeAdmin.controller.js";
const adminRouter = express.Router();
adminRouter.get("/totalRevenue", isAuthenticated, isAuthorised, totalRevenue);
adminRouter.get("/totalTrips", isAuthenticated, isAuthorised, totalTrips);
adminRouter.get(
    "/totalActiveUsers",
    isAuthenticated,
    isAuthorised,
    totalActiveUsers
);
adminRouter.get(
    "/getMonthlyRevenue",
    isAuthenticated,
    isAuthorised,
    getMonthlyRevenue
);
adminRouter.post("/makeAdmin", isAuthenticated, isAuthorised, makeAdmin);
export default adminRouter;
