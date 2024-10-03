import User from "../auth/model/user.model.js";
import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("user not authenticated");
    }
    const data = await jwt.verify(token, "bookmy-ride");
    if (!data) {
      throw new Error("user not authenticated");
    }
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error("user not authenticated");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message, status: " false" });
  }
};

export default isAuthenticated;
