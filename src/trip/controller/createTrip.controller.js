import { tripValidation } from "../../utils/validate.js";
import Trip from "../model/trips.model.js";
import cloudinaryUpload from "../../utils/cloudinaryImageUpload.js";
import {
  generateSeatsFor2x1,
  generateSeatsFor2x2,
  generateSeatsFor3x2,
} from "../../utils/generateSeat.js";
export const createTrip = async (req, res) => {
  try {
    tripValidation(req);
    const { filename } = req.file;
    const image = req.file;
    /* filePath = path.resolve(
            "__dirname/../public/uploads/images/" + filename
        ); */
    if (image.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File too Large", status: false });
    }
    const format = image.mimetype.split("/")[1];

    const { secure_url } = await cloudinaryUpload(
      image.buffer,
      filename,
      "book-my_ride",
      format
    );

    req.body.destination = JSON.parse(req.body.destination);

    let seats;
    if (req.body.busType === "2x1") {
      seats = generateSeatsFor2x1();
    } else if (req.body.busType === "3x2") {
      seats = generateSeatsFor3x2();
    } else if (req.body.busType === "2x2") {
      seats = generateSeatsFor2x2();
    }

    const newTrip = await new Trip({
      ...req.body,
      photoUrl: secure_url,
      seats,
    });
    await newTrip.save();

    res.status(200).json({
      message: "Trip created",
      status: true,
    });
  } catch (error) {
    res.status(409).json({ message: error.message, status: false });
  } /* finally {
        // Cleanups
        await fs.promises.unlink(filePath);
    } */
};
