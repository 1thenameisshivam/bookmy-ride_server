import Payment from "../../Booking/model/payment.model.js";
export const totalRevenue = async (req, res) => {
    try {
        const payments = await Payment.find({ paymentStatus: "SUCCESS" });
        let total = 0;
        payments.forEach((payment) => {
            total += payment.amount;
        });
        // console.log("Total Payment", total);
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1); // Set to the first day of the current month
        currentMonthStart.setHours(0, 0, 0, 0);

        const previousMonthStart = new Date(currentMonthStart);
        previousMonthStart.setMonth(previousMonthStart.getMonth() - 1); // Previous month
        const previousMonthEnd = new Date(currentMonthStart);
        previousMonthEnd.setSeconds(-1); // Last second of the previous month
        const currentMonthPayments = await Payment.find({
            paymentStatus: "SUCCESS",
            createdAt: { $gte: currentMonthStart },
        });
        const currentMonthRevenue = currentMonthPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );
        // Fetch previous month revenue
        // console.log("Current month Revenue is :- ", currentMonthRevenue);
        const previousMonthPayments = await Payment.find({
            paymentStatus: "SUCCESS",
            createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
        });
        const previousMonthRevenue = previousMonthPayments.reduce(
            (total, payment) => total + payment.amount,
            0
        );
        // console.log("previous month revenue is :- ", previousMonthRevenue);

        const percentageChange =
            ((currentMonthRevenue - previousMonthRevenue) /
                previousMonthRevenue) *
            100;

        // console.log("Percentage Change is :- ", percentageChange);
        /* if (percentageChange < 0) {
            console.log("Revenue decreased by", percentageDecrease, "%");
            res.status(200).json({
                totalRevenue: total,
                percentageChange: percentageDecrease,
            });
        }
        if (percentageIncrease > 0) {
            console.log("Revenue increased by", percentageIncrease, "%");
            res.status(200).json({
                totalRevenue: total,
                percentageChange: percentageIncrease,
            });
        } */

        res.status(200).json({
            totalRevenue: total,
            percentageChange: percentageChange.toFixed(1),
        });
    } catch (error) {
        res.status(500).json({ message: error.message, status: false });
    }
};
