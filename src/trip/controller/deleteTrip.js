import Trip from "../model/trips.model.js";
import cloudinary from "../../config/cloudinary.config.js";
export const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            throw new Error("Trip not found");
        }
        // Extract the publicId from the photoUrl
        const photoUrl = trip.photoUrl;
        const publicId = photoUrl.split("/").slice(-2).join("/").split(".")[0]; // Extracting public_id
        console.log("Public Id is: ", publicId);
        const deleteResult = await cloudinary.uploader.destroy(publicId); // Delete the image from cloudinary
        console.log("Deleted Result of the image", deleteResult);
        res.status(200).json({
            message: "Trip and associated image deleted",
            status: true,
        });
    } catch (error) {
        res.status(404).json({ message: error.message, status: false });
    }
};
