import { Cashfree } from "cashfree-pg";
import { APP_ID, SECRET_KEY } from "../../utils/constant.js";
import Payment from "../model/payment.model.js";
import Trip from "../../trip/model/trips.model.js";
Cashfree.XClientId = APP_ID;
Cashfree.XClientSecret = SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const varifyPayment = async (req, res) => {
  const { orderId, tripId, seats } = req.body;
  try {
    // Fetch payment details from Cashfree

    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    const paymentData = response.data;
    // Check if the payment was successful
    if (paymentData[0].payment_status === "SUCCESS") {
      // Retrieve the trip to update seat status
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      // Update the status of the selected seats to "BOOKED"
      const updatedSeats = trip.seats.map((row) =>
        row.map((seat) => {
          if (seats.includes(seat.seatNumber)) {
            return { ...seat, status: "booked" };
          }
          return seat;
        })
      );
      trip.seats = updatedSeats;
      await trip.save();

      // Save payment details in the Payment collection
      const payment = new Payment({
        orderId,
        transactionId:
          paymentData[0].payment_gateway_details.gateway_payment_id,
        tripId,
        userId: req.user._id,
        amount: paymentData[0].payment_amount,
        currency: paymentData[0].payment_currency,
        paymentStatus: "SUCCESS",
        seatsBooked: seats.map((seatNumber) => ({
          seatNumber,
          status: "BOOKED",
        })),
        paymentDetails: {
          method: paymentData[0].payment_method,
          timestamp: new Date(),
        },
      });

      await payment.save();

      return res.json({
        message: "Payment successful and seats booked",
        paymentStatus: payment.paymentStatus,
        seats: payment.seatsBooked,
      });
    } else {
      // If payment failed, respond with appropriate message
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
