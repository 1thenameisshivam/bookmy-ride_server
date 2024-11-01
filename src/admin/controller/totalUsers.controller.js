import User from "../../auth/model/user.model.js";

export const totalActiveUsers = async (req, res) => {
    try {
        // Define date ranges for current month
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1); // First day of the current month
        currentMonthStart.setHours(0, 0, 0, 0);

        // Define date ranges for previous month
        const previousMonthStart = new Date(currentMonthStart);
        previousMonthStart.setMonth(previousMonthStart.getMonth() - 1); // First day of the previous month
        const previousMonthEnd = new Date(currentMonthStart);
        previousMonthEnd.setSeconds(-1); // Last second of the previous month

        // Fetch total active users (assuming `isActive` is a field in the User model)
        const totalUsers = await User.countDocuments();

        // Fetch new users for the current month
        const currentMonthNewUsers = await User.countDocuments({
            createdAt: { $gte: currentMonthStart },
        });

        // Fetch new users for the previous month
        const previousMonthNewUsers = await User.countDocuments({
            createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
        });

        // Calculate the change in number of new users
        const numberChangeInUsers =
            previousMonthNewUsers > 0
                ? currentMonthNewUsers - previousMonthNewUsers
                : 0;

        // Send response
        res.status(200).json({
            totalUsers: totalUsers,
            numberChangeInUsers: numberChangeInUsers, // Limiting to one decimal
        });
    } catch (error) {
        console.error("Error in totalActiveUsers controller:", error);
        res.status(500).json({ message: error.message, status: false });
    }
};
