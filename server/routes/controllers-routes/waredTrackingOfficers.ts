import WaredTrackingOfficersController from "../../controllers/WaredTrackingOfficersController";
import express from "express";
import isAuth from "../../middelwares/isAuth";

const waredTrackingOfficersRouter = express.Router();

waredTrackingOfficersRouter.post(
  "/waredtrackingofficers",
  isAuth,
  WaredTrackingOfficersController.store
);
export default waredTrackingOfficersRouter