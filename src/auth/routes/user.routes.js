import express from "express";
import { login } from "../controller/login.controller.js";
import { signup } from "../controller/signup.controller.js";
import limiter from "../../middleware/rateLimit.js";
import { logOut } from "../controller/logOut.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { isAdmin } from "../controller/isAdmin.js";
import isAuthorised from "../../middleware/isAuthorised.js";
import { findUsers } from "../controller/findUsers.controller.js";
import { findTotalUsers } from "../controller/findTotalUsers.controller.js";
import { getUserDetails } from "../controller/getUserDetails.js";
// import { makeAdmin } from "../../admin/controller/makeAdmin.controller.js";

const userRouter = express.Router();

userRouter.post("/login", limiter, login);
userRouter.post("/signup", limiter, signup);
userRouter.post("/logout", isAuthenticated, logOut);
userRouter.get("/admin", isAuthenticated, isAuthorised, isAdmin);
userRouter.get("/findUsers", isAuthenticated, isAuthorised,findUsers);
userRouter.get("/totalUsers", isAuthenticated, isAuthorised, isAdmin, findTotalUsers);
userRouter.get("/getUserDetails/:id", isAuthenticated, isAuthorised, getUserDetails);
// userRouter.post("/makeAdmin", isAuthenticated, isAuthorised,makeAdmin);

export default userRouter;
