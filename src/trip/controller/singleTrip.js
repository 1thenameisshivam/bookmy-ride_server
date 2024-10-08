import Trip from "../model/trips.model.js";
export const singleTrip = async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await Trip.findById({ _id: id });
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({ trip, status: true });
  } catch (error) {
    res.status(404).json({ message: error.message, status: false });
  }
};
