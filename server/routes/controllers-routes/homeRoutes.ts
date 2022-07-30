import HomeController from "../../controllers/HomeController";
import express from "express";

const homeRouter = express.Router();

homeRouter.get("/home", HomeController.index);
export default homeRouter;
