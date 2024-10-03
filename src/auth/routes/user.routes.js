import express from "express";
import { login } from "../controller/login.controller.js";
import { signup } from "../controller/signup.controller.js";
const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);

export default userRouter;
