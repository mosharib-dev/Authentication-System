import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

// for post route
authRouter.post("/register",authController.register);

// for login
authRouter.post("/login",authController.login);

//for get-me route

authRouter.get("/get-me",authController.getMe);

// to get RefreshToken

authRouter.get("/refresh-token",authController.refreshToken);

// to get for one device logout

authRouter.get("/logout",authController.logout);

// to get for logout from all devices

authRouter.get("/logout-all",authController.logoutAll);

// to get route for email verify
authRouter.post("/verify-email", authController.verifyEmail);

export default authRouter;