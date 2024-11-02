import User from "../model/user.model.js";

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            "createdAt userName email place type phNo "
        );
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in finding users:", error);
        res.status(500).json({
            message: error.message,
        });
    }
};
