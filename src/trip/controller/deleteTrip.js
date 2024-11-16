import Trip from "../model/trips.model.js";
import cloudinary from "../../config/cloudinary.config.js";

export const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);

        if (!trip) {
            return res
                .status(404)
                .json({ message: "Trip not found", status: false });
        }

        // Ensure the photoUrl exists before attempting to delete the image
        if (!trip.photoUrl) {
            return res.status(400).json({
                message: "No image found associated with the trip",
                status: false,
            });
        }

        // Extract the publicId from the photoUrl using regex for better reliability
        const photoUrl = trip.photoUrl;
        // const publicId = photoUrl.match(/\/v[0-9]+\/([^\/]+)/);
        const publicId = photoUrl.split("/").slice(-2).join("/").split(".")[0];

        // const imagePublicId = publicId[1];

        // Delete the image from Cloudinary
        try {
            const deleteResult = await cloudinary.uploader.destroy(publicId);

            if (deleteResult.result === "ok") {
                console.log("Deleted image successfully:", deleteResult);
            } else {
                console.error("Error deleting image:", deleteResult);
                return res.status(500).json({
                    message: "Error deleting image from Cloudinary",
                    status: false,
                });
            }
        } catch (cloudinaryError) {
            console.error("Cloudinary error:", cloudinaryError);
            return res.status(500).json({
                message: "Failed to delete image from Cloudinary",
                status: false,
            });
        }

        res.status(200).json({
            message: "Trip and associated image deleted successfully",
            status: true,
        });
    } catch (error) {
        console.error("Error while deleting trip:", error);
        res.status(500).json({ message: "Server error", status: false });
    }
};
