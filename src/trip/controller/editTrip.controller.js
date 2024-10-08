import cloudinaryUpload from "../../utils/cloudinaryImageUpload.js";
import Trip from "../model/trips.model.js";
import path from "node:path";
import fs from "fs";
import { tripValidation} from "../../utils/validate.js";
export const editTrip = async (req, res) => {
    let filePath;
    try {
        tripValidation(req);
        const trip = await Trip.findById(req.params.id);
        console.log(trip);
        if (!trip) {
            console.log("Trip Not Found!!");
            throw new Error("Trip not found");
        }
        let secure_url = trip.photoUrl;
        if (req.file) {
            const { filename } = req.file;
            const image = req.file;
            filePath = path.resolve(
                "__dirname/../public/uploads/images/" + filename
            );
            const format = image.mimetype.split("/")[1];
            const uploadResponse = await cloudinaryUpload(
                filePath,
                filename,
                "book-my_ride",
                format
            );
            secure_url = uploadResponse.secure_url;
        }
        Object.keys(req.body).forEach((key) => {
            trip[key] = req.body[key];
        });
        trip.photoUrl = secure_url;
        await trip.save();
        res.status(200).json({ message: "Trip updated successfully" });
    } catch (error) {
        console.log("Error Occured in the catch block !!");
        res.status(409).json({ message: error.message, status: false });
    } finally {
        if (filePath) {
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                console.error("Failed to delete temporary file:", err);
            }
        }
    }
};
