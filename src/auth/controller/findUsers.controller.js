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
