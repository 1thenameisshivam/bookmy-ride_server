import mongoose from "mongoose";
import validator from "validator";
const tripSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Trip title is required"],
            trim: true,
            minLength: [5, "Title must be at least 5 characters"],
            maxLength: [100, "Title must be at most 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Trip description is required"],
            trim: true,
            minLength: [20, "Description must be at least 20 characters"],
            maxLength: [2000, "Description must be at most 2000 characters"],
        },
        destination: {
            type: [String], // Array of strings
            required: [true, "Destination is required"],
            validate: {
                validator: function (value) {
                    return value.every((item) =>
                        validator.isAlpha(item, "en-US", { ignore: " " })
                    );
                },
                message:
                    "Each destination should contain only alphabetic characters and spaces",
            },
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
            min: [1, "Duration must be at least 1 day"],
        },
        availableSeats: {
            type: Number,
            required: [true, "Available seats are required"],
            min: [1, "There must be at least one seat available"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "Start date must be in the future",
            },
        },
        pickup: {
            type: String,
            required: [true, "Pickup location is required"],
            maxLength: [100, "Pickup location must be at most 100 characters"],
        },
        drop: {
            type: String,
            required: [true, "Drop location is required"],
            maxLength: [100, "Drop location must be at most 100 characters"],
        },
        arrivalTime: {
            type: String,
            required: [true, "Arrival time is required"],
            maxLength: [100, "Arrival time must be at most 100 characters"],
        },
        departureTime: {
            type: String,
            required: [true, "Departure time is required"],
            maxLength: [100, "Departure time must be at most 100 characters"],
        },
        ac: {
            type: Boolean,
            default: false,
            required: [true, "AC is required"],
        },
        meal: {
            type: String,
            required: [true, "Meal is required"],
            maxLength: [200, "Meal must be at most 200 characters"],
        },
        accommodation: {
            type: String,
            required: [true, "Accommodation is required"],
            maxLength: [200, "Accommodation must be at most 200 characters"],
        },
        activities: {
            type: String,
            required: [true, "Activities is required"],
            maxLength: [200, "Activities must be at most 200 characters"],
        },
        expertGuide: {
            type: String,
            required: [true, "Expert Guide is required"],
            maxLength: [200, "Expert Guide must be at most 200 characters"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: "End date must be after the start date",
            },
        },
        photoUrl: {
            type: String,
            required: [true, "Photo URL is required"],
            validate: {
                validator: function (value) {
                    return validator.isURL(value);
                },
                message: "Please enter a valid URL",
            },
        },
        seats: [
            [
                {
                    seatNumber: {
                        type: String,
                        required: [true, "Seat number is required"],
                    },

                    status: {
                        type: String,
                        enum: ["booked", "available"],
                        default: "available",
                    },
                    isBooked: { type: Boolean, default: false },
                    reserved: { type: Boolean, default: false },
                    reservedBy: { type: String, default: null },
                    reservationExpiresAt: { type: Date, default: null },
                },
            ],
        ],
        busType: { type: String, enum: ["3x2", "2x1", "2x2"], required: true },
    },
    { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
