import User from "../model/user.model.js";

export const findUsers = async (req, res) => {
    try {
        const users = await User.find().select("createdAt userName email place type ");
        res.status(200).json({ users });
    }
    catch (error) {
        console.error("Error in finding users:", error);
        res.status(500).json({ message: error.message });
    }
}


/* import User from "../model/user.model.js";

export const findUsers = async (req, res) => {
    try {
        // Get page and limit from query parameters, with defaults
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch users with pagination and select only necessary fields
        const users = await User.find()
            .select("createdAt userName email place type")
            .skip(skip)
            .limit(limit);

        // Get the total count of users for pagination calculation
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit), // Calculate the total pages
            currentPage: page,
        });
    } catch (error) {
        console.error("Error in finding users:", error);
        res.status(500).json({ message: error.message });
    }
};
 */