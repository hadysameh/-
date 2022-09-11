import SaderOptionsController from "../../controllers/SaderOptionsController";
import express from "express";
import isAuth from "../../middelwares/isAuth";

const saderOptionsRouter = express.Router();

saderOptionsRouter.get("/saderoptions", isAuth, SaderOptionsController.get);
export default saderOptionsRouter;
