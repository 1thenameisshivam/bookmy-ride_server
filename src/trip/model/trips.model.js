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
    },
    { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
