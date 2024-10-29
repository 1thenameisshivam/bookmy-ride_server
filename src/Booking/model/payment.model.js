import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    seatsBooked: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["LOCKED", "BOOKED"],
          required: true,
        },
      },
    ],
    paymentDetails: {
      method: { type: mongoose.Schema.Types.Mixed },
      timestamp: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
