import express from "express";
import { login } from "../controller/login.controller.js";
import { signup } from "../controller/signup.controller.js";
import limiter from "../../middleware/rateLimit.js";
const userRouter = express.Router();

userRouter.post("/login",limiter, login);
userRouter.post("/signup", limiter, signup);

export default userRouter;
