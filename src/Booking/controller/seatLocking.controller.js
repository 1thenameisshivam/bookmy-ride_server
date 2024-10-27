import Trip from "../../trip/model/trips.model.js";

// Controller to lock seats
export const lockSeats = async (req, res) => {
  const { tripId, selectedSeats } = req.body;
  const userId = req.user._id;
  try {
    // Find the trip
    const trip = await Trip.findById(tripId);
    if (!trip)
      return res.status(404).json({ message: "Trip not found", status: false });

    const currentTime = new Date();
    let canLockAllSeats = true;

    // Check if all selected seats are available and not reserved
    for (const seatToLock of selectedSeats) {
      const seatFound = trip.seats.some((row) =>
        row.some(
          (seat) =>
            seat.seatNumber === seatToLock &&
            seat.status === "available" &&
            (!seat.reserved || seat.reservationExpiresAt < currentTime) // Not reserved or reservation has expired
        )
      );

      if (!seatFound) {
        canLockAllSeats = false;
        break;
      }
    }

    // If any seat is unavailable, return an error message
    if (!canLockAllSeats) {
      return res.status(400).json({
        message: "One or more selected seats are already booked or reserved",
        status: false,
      });
    }

    // Loop through the seats and reserve only the selected ones
    selectedSeats.forEach((seatToLock) => {
      for (const row of trip.seats) {
        const seat = row.find((s) => s.seatNumber === seatToLock);
        if (
          seat &&
          seat.status === "available" &&
          (!seat.reserved || seat.reservationExpiresAt < currentTime)
        ) {
          seat.reserved = true;
          seat.reservedBy = userId;
          seat.reservationExpiresAt = new Date(
            currentTime.getTime() + 30 * 1000
          ); // 30 seconds
        }
      }
    });

    await trip.save();
    return res.status(200).json({
      message: "Seats locked successfully Please complete the payment",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error locking seats", error });
  }
};
