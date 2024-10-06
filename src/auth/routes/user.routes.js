import express from "express";
import { login } from "../controller/login.controller.js";
import { signup } from "../controller/signup.controller.js";
import limiter from "../../middleware/rateLimit.js";
import { logOut } from "../controller/logOut.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { isAdmin } from "../controller/isAdmin.js";
import isAuthorised from "../../middleware/isAuthorised.js";

const userRouter = express.Router();

userRouter.post("/login", limiter, login);
userRouter.post("/signup", limiter, signup);
userRouter.post("/logout", isAuthenticated, logOut);
userRouter.get("/admin", isAuthenticated, isAuthorised, isAdmin);

export default userRouter;
