import Payment from "../../Booking/model/payment.model.js";
export const getMonthlyRevenue = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear(); // Get the current year
        const monthlyRevenue = [];

        // Iterate through each month from January (0) to December (11)
        for (let month = 0; month < 12; month++) {
            const monthStart = new Date(currentYear, month, 1); // Start of the month
            const monthEnd = new Date(currentYear, month + 1, 1); // Start of the next month

            // Calculate the total revenue for the current month
            const totalRevenueForMonth = await Payment.find({
                createdAt: { $gte: monthStart, $lt: monthEnd },
            }).then((docs) => docs.reduce((sum, doc) => sum + doc.amount, 0));

            // Add the month's result to the monthlyRevenue array
            monthlyRevenue.push({
                month: monthStart.toLocaleString("default", { month: "short" }), // Get month name
                totalRevenue: totalRevenueForMonth,
            });
        }
        console.log("Monthly Revenue is :- ",monthlyRevenue);
        res.status(200).json({
            year: currentYear,
            monthlyRevenue,
        });
    } catch (error) {
        console.error("Error in fetching monthly revenue:", error);
        res.status(500).json({ message: error.message });
    }
};
