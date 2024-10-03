import { loginValidation } from "../../utils/validate.js";
import User from "../model/user.model.js";
export const login = async (req, res) => {
  try {
    loginValidation(req);
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (user.length == 0) {
      throw new Error("incorrect credential");
    }
    const isCorrectPassword = await user[0].validatePassword(password);
    if (!isCorrectPassword) {
      throw new Error("incorrect credential");
    }
    const token = await user[0].generateToken();
    if (!token) {
      throw new Error("somthing internal issue");
    }
    res.cookie("token", token);
    res
      .status(200)
      .json({ sucess: true, message: "user logged in sucessfully" });
  } catch (err) {
    res.status(401).json({ sucess: false, message: err.message });
  }
};
