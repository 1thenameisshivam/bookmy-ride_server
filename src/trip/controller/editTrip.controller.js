import cloudinaryUpload from "../../utils/cloudinaryImageUpload.js";
import { extractPublicId } from "cloudinary-build-url";
import Trip from "../model/trips.model.js";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { tripValidation } from "../../utils/validate.js";
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
            const public_id = extractPublicId(trip.photoUrl);
            console.log("public id is :-", public_id);
            //Delete from the cloudinary
            const destroyResponse = await cloudinary.uploader.destroy(
                public_id,
                { resource_type: "image" }
            );
            if (destroyResponse.result !== "ok") {
                console.error(
                    "Failed to delete old image from Cloudinary:",
                    destroyResponse
                );
            } else {
                console.log("Old image deleted:", destroyResponse);
            }
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
