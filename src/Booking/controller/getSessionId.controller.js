import { Cashfree } from "cashfree-pg";
import { APP_ID, SECRET_KEY } from "../../utils/constant.js";
import Trip from "../../trip/model/trips.model.js";

Cashfree.XClientId = APP_ID;
Cashfree.XClientSecret = SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const getSessionId = async (req, res) => {
  const { tripId, noOfSeats } = req.body;
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const ammount = trip.price * noOfSeats + 50;

    const request = {
      order_amount: ammount,
      order_currency: "INR",
      customer_details: {
        customer_id: req.user._id, // Use the authenticated user's ID
        customer_name: req.user.userName,
        customer_email: req.user.email,
        customer_phone: req.user.phNo || "9999999999", // Provide a fallback if necessary
      },
      order_meta: {
        return_url:
          "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123",
        business_name: "BookMyRide",
        additional_info: "Additional details about your service or product.",
      },
      order_note: "Booking trip",
    };

    // Use await to handle the async PGCreateOrder function
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    // Extract the necessary data from the response
    const data = response.data;

    // Send response back to the client if necessary
    res.json(data);
  } catch (error) {
    console.error("Error setting up order request:", error.response.data);
    res.status(500).json({ error: "Order creation failed" });
  }
};
