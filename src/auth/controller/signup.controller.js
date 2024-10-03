import { signupValidation } from "../../utils/validate.js";
import userSchema from "../model/user.model.js";

export const signup = async (req, res) => {
  try {
    signupValidation(req); // inpurequest validation
    res.status(200).json({ message: "user created", status: "sucess" });
  } catch (err) {
    res.status(401).json({ message: err.message, status: " false" });
  }
};
