import Trip from "../../trip/model/trips.model.js";

export const totalTrips = async (req, res) => {
    try {
        // Define date ranges for current month
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1); // First day of the current month
        currentMonthStart.setHours(0, 0, 0, 0);

        const previousMonthStart = new Date(currentMonthStart);
        previousMonthStart.setMonth(previousMonthStart.getMonth() - 1); // First day of the previous month
        const previousMonthEnd = new Date(currentMonthStart);
        previousMonthEnd.setSeconds(-1); // Last second of the previous month

        // Fetch trips for the current month
        const currentMonthTrips = await Trip.countDocuments({
            createdAt: { $gte: currentMonthStart },
        });

        // Fetch trips for the previous month
        console.log("Current Month Trips are :- ",currentMonthTrips)
        const previousMonthTrips = await Trip.countDocuments({
            createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
        });
        console.log("previous months trips is :- ",previousMonthTrips)
        // Calculate the percentage increase or decrease
        const numberChange =
            previousMonthTrips > 0
                ? (currentMonthTrips - previousMonthTrips) 
                : 0;

        const totalTrips = await Trip.countDocuments();

        console.log("Total Trips:", currentMonthTrips);
        // console.log("Percentage Change in Trips:", percentageChange);

        res.status(200).json({
            totalTrips: totalTrips,
            numberChange: numberChange, // Limiting to one decimal
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
};
