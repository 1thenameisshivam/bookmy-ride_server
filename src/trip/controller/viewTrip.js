import Trip from "../model/trips.model.js";

export const viewTrip = async (req, res) => {
    const id = req.params.id;
    console.log("id is :- ", id);
    try {
        const trip = await Trip.findById(id);
        if (!trip) {
            throw new Error("Trip not found");
        }
        console.log(trip);
        res.status(200).json({ message: "Trip Found ", data: trip });
    } catch (error) {
        console.error(error);
    }
};
