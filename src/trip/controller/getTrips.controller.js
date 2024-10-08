import Trip from "../model/trips.model.js";

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ startDate: { $gte: Date.now() } })
      .select("photoUrl title price duration availableSeats") // Specify fields to include
      .exec(); // Execute the query

    res.status(200).json({ trips, status: true });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error", status: false }); // Use 500 for server errors
  }
};
