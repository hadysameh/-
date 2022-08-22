import SaderTrackingOfficersController from "../../controllers/SaderTrackingOfficersController";
import express from "express";
import isAuth from "../../middelwares/isAuth";

const saderTrackingOfficersRouter = express.Router();

saderTrackingOfficersRouter.post(
  "/sadertrackingofficers",
  isAuth,
  SaderTrackingOfficersController.store
);

export default saderTrackingOfficersRouter
