import AuthController from "../controllers/AuthController";
import express from "express";
import isAuth from "../middelwares/isAuth";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/isauth", isAuth, AuthController.isAuth);
export default authRouter;
