import express from "express";
// import isAuthorised from "../../middleware/isAuthorised.js";
import { createTrip } from "../controller/createTrip.controller.js";
import upload from "../../middleware/multer.js";
import { editTrip } from "../controller/editTrip.controller.js";
const tripRouter = express.Router();
tripRouter.post("/createTrip", upload.single("image"), createTrip);
tripRouter.patch("/editTrip/:id",upload.single("image"),editTrip);

export default tripRouter;
