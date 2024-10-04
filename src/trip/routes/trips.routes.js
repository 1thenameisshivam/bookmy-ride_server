import express from "express";
// import isAuthorised from "../../middleware/isAuthorised.js";
import { createTrip } from "../controller/createTrip.controller.js";
import upload from "../../config/multer.config.js";
const tripRouter = express.Router();
tripRouter.post(
    "/createTrip",
    upload.single("image"),
    createTrip
);
export default tripRouter;
