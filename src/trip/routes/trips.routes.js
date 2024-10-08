import express from "express";
import { createTrip } from "../controller/createTrip.controller.js";
import upload from "../../middleware/multer.js";
import { editTrip } from "../controller/editTrip.controller.js";
import isAuthorised from "../../middleware/isAuthorised.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getTrips } from "../controller/getTrips.controller.js";
import { singleTrip } from "../controller/singleTrip.js";
const tripRouter = express.Router();
tripRouter.post(
  "/createTrip",
  [isAuthenticated, isAuthorised, upload.single("image")],
  createTrip
);
tripRouter.patch(
  "/editTrip/:id",
  [isAuthenticated, isAuthorised, upload.single("image")],
  editTrip
);
tripRouter.get("/", getTrips);
tripRouter.get("/:id", singleTrip);
export default tripRouter;
