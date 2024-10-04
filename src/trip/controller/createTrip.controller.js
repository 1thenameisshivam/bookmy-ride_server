import { tripValidation } from "../../utils/validate.js";
import Trip from "../model/trips.model.js";
import cloudinaryUpload from "../../utils/cloudinaryImageUpload.js";
import path from "node:path";
import fs from "fs";

// import { fileURLToPath } from "url";
export const createTrip = async (req, res) => {
    try {
        tripValidation(req);
        const { filename } = req.file;
        // console.log("fielName: " + filename);
        const image = req.file;
        const filePath = path.resolve(
            "__dirname/../public/uploads/images/" + filename
        );
        console.log("Name of the filePath : " + filePath);
        const format = image.mimetype.split("/")[1];
        console.log("File Format: ", format);
        const { secure_url } = await cloudinaryUpload(
            filePath,
            filename,
            "book-my_ride",
            format
        );
        console.log("After secure_url", secure_url);
        const newTrip = await new Trip({
            ...req.body,
            photoUrl: secure_url,
        });
        await fs.promises.unlink(filePath);
        await newTrip.save();
        res.json({
            message: "Trip created",
            status: true,
        });
    } catch (error) {
        res.status(409).json({ message: error.message, status: false });
    }
};
