import HomeController from "../controllers/HomeController";
import express from "express";
import isAuth from "../../auth/middelwares/isAuth";

const homeRouter = express.Router();

homeRouter.get("/home", isAuth, HomeController.index);
export default homeRouter;
