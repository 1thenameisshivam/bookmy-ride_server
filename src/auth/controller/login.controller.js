import { loginValidation } from "../../utils/validate.js";
import User from "../model/user.model.js";
export const login = async (req, res) => {
  try {
    loginValidation(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("incorrect credential");
    }
    const isCorrectPassword = await user.validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error("incorrect credential");
    }
    const token = await user.generateToken();
    if (!token) {
      throw new Error("Some internal issue");
    }
    res.cookie("token", token, {
      secure: true,
    });
    res.status(200).json({
      status: true,
      message: "user logged in sucessfully",
    });
  } catch (err) {
    res.status(401).json({ status: false, message: err.message });
  }
};
