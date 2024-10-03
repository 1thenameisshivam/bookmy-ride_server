import { signupValidation } from "../../utils/validate.js";
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    try {
        signupValidation(req); // inpu request validation
        const user = await User.find({ email: req.body.email });
        if (user.length > 0) {
            throw new Error("user already exist");
        }
        const newUser = new User({
            ...req.body,
        });
        await newUser.save();
        const token = await newUser.generateToken();
        if (!token) {
            throw new Error("somthing internal issue");
        }
        res.cookie("token", token);
        res.status(200).json({ message: "user created", status: "sucess" });
    } catch (err) {
        res.status(409).json({ message: err.message, status: " false" });
    }
};
