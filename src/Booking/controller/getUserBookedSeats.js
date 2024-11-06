import Payment from "../model/payment.model.js";
// Function to get booked seats for a user
// Function to get booked seats for a user
export const getUserBookedSeats = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user is authenticated and user ID is in req.user

        // Query to find all successful payments by the user, sorted by newest first
        const bookings = await Payment.find({
            userId: userId,
            paymentStatus: "SUCCESS",
        })
            .select("tripId seatsBooked amount currency orderId createdAt")
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

        if (bookings.length === 0) {
            return res
                .status(404)
                .json({
                    message: "No bookings found for this user.",
                    status: false,
                });
        }

        // Sending back booking data
        res.status(200).json(
            bookings.map((booking) => ({
                tripId: booking.tripId,
                seatsBooked: booking.seatsBooked,
                amount: booking.amount,
                orderId: booking.orderId,
                currency: booking.currency,
                bookingDate: booking.createdAt,
            }))
        );
    } catch (error) {
        console.error("Error retrieving booked seats:", error);
        res.status(500).json({
            message: "Failed to retrieve booked seats",
            error,
        });
    }
};
