import express from "express";
import { createTrip } from "../controller/createTrip.controller.js";
import upload from "../../middleware/multer.js";
import { editTrip } from "../controller/editTrip.controller.js";
import isAuthorised from "../../middleware/isAuthorised.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
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

export default tripRouter;
