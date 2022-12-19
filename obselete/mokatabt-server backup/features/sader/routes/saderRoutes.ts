import SaderBoxController from "../controllers/SaderBoxController";
import SaderDetailsPreviewController from "../controllers/SaderDetailsPreviewController";
import EditSaderController from "../controllers/EditSaderController";
import DeleteSaderController from "../controllers/DeleteSaderController";
import CreateSaderController from "../controllers/CreateSaderController";
import NumberOfUnreadSaderController from "../controllers/NumberOfUnreadSaderController";
import express from "express";
import { Request, Response } from "express";
import { saderUpload } from "../../../middelwares/multer";
import isAuth from "../../auth/middelwares/isAuth";
import SaderTrackingOfficersController from "../controllers/SaderTrackingOfficersController";
import WaredOptionsController from "../../wared/controllers/WaredOptionsController";

const saderRouter = express.Router();

saderRouter.get("/onesader", isAuth, SaderDetailsPreviewController.getOne);

saderRouter.get(
  "/saderbox/getNumberOfUnreadSader",
  isAuth,
  NumberOfUnreadSaderController.getNumberOfUnreadSader
);

saderRouter.get(
  "/saderbox/searchOptions",
  isAuth,
  SaderBoxController.getSearchOptions
);

saderRouter.get("/saderbox/search", isAuth, SaderBoxController.getSearch);

//same search options as wared
saderRouter.get("/saderoptions", isAuth, WaredOptionsController.get);

saderRouter.post(
  "/saderbox/store",
  [saderUpload.single("mokatbaPdf"), isAuth],
  CreateSaderController.store
);

saderRouter.post(
  "/sadertrackingofficers",
  isAuth,
  SaderTrackingOfficersController.store
);

saderRouter.put(
  "/saderbox/edit",
  [isAuth, saderUpload.single("mokatbaPdf")],
  EditSaderController.update
);

saderRouter.delete(
  "/saderbox/deletesader",
  isAuth,
  DeleteSaderController.delete
);


export default saderRouter;
