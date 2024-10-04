import { tripValidation } from "../../utils/validate.js";
import Trip from "../model/trips.model.js";
import cloudinaryUpload from "../../utils/cloudinaryImageUpload.js";
import path from "node:path";
// import { fileURLToPath } from "url";
export const createTrip = async (req, res) => {
    try {
        tripValidation(req);
        // const result=await
        const { filename } = req.file;
        console.log("fielName: " + filename);

        const image = req.file;
        const filePath = path.resolve(
            "__dirname/bookmy-ride_server/../../public/uploads/images/" + filename
        );
        console.log("Name of the filePath : " + filePath);
        // const __filename = fileURLToPath(import.meta.url);
        /*  const { originalname, mimetype, filename } = req.file;
        const __dirname = path.dirname(filename);

        const filePath = path.resolve(
            __dirname + "/../../public/uploads/image/" + filename
        ); */

        // Use the original file name and mimetype
        // const format = mimetype.split("/")[1];

        /* console.log("File Path: ", filePath);
        console.log("Original Filename: ", originalname); */
        const format = image.mimetype.split("/")[1];

        console.log("File Format: ", format);

        const secure_url = await cloudinaryUpload(
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
        await newTrip.save();
        res.json({
            message: "Trip created",
            status: true,
        });
    } catch (error) {
        res.status(409).json({ message: error.message, status: false });
    }
};
