import WaredOptionsController from "../../controllers/WaredOptionsController";
import express from "express";
import isAuth from "../../middelwares/isAuth";

const waredOptionsRouter = express.Router();

waredOptionsRouter.get("/waredoptions", isAuth, WaredOptionsController.get);
waredOptionsRouter.get("/waredoptions/getDaysBeforeExecution", isAuth, WaredOptionsController.getDaysBeforeExecution);
export default waredOptionsRouter;
