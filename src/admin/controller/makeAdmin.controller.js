import User from "../../auth/model/user.model.js";

export const makeAdmin = async (req, res) => {
    // req.body = JSON.parse(req.body);
    const { userId } = req.body;
    console.log("User Id is :- ", userId);
    try {
        const user = await User.findById(userId);
        console.log("User is :- ", user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.type = "admin";
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in finding users:", error);
        res.status(500).json({ message: error.message });
    }
};
