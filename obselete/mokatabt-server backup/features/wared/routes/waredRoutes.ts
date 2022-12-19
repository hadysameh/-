import CreateWaredController from "../controllers/CreateWaredController";
import EditWaredController from "../controllers/EditWaredController";
import MokatbaDetailsPreviewController from "../controllers/MokatbaDetailsPreviewController";
import NumberOfUnreadWaredController from "../controllers/NumberOfUnreadWaredController";
import WaredBoxController from "../controllers/WaredBoxController";
import WaredWithDeadLineController from "../controllers/WaredWithDeadLineController";
import express from "express";
import { waredUpload } from "../../../middelwares/multer";
import { isAuth } from "../../auth";
import UpdateMokatbaOfficersAndBranchesContoller from "../controllers/UpdateMokatbaOfficersAndBranchesContoller";
import DeleteWaredController from "../controllers/DeleteWaredController";
import WaredTrackingOfficersController from "../controllers/WaredTrackingOfficersController";
import WaredOptionsController from "../controllers/WaredOptionsController";

const waredRouter = express.Router();

waredRouter.get("/wared", isAuth, MokatbaDetailsPreviewController.getOne);
waredRouter.get(
  "/wared/waredwithdeadline",
  isAuth,
  WaredWithDeadLineController.getAllWaredWithDeadLine
);

waredRouter.get(
  "/waredbox/getNumberOfUnreadWared",
  isAuth,
  NumberOfUnreadWaredController.getNumberOfUnreadWared
);

waredRouter.get("/waredbox/search", isAuth, WaredBoxController.getSearch);
waredRouter.get("/waredoptions", isAuth, WaredOptionsController.get);
waredRouter.get("/waredoptions/getDaysBeforeExecution", isAuth, WaredOptionsController.getDaysBeforeExecution);

waredRouter.post(
  "/waredbox/store",
  [isAuth, waredUpload.single("mokatbaPdf")],
  CreateWaredController.store
);
waredRouter.post(
  "/waredtrackingofficers",
  isAuth,
  WaredTrackingOfficersController.store
);

waredRouter.put(
  "/waredbox/edit",
  [isAuth, waredUpload.single("mokatbaPdf")],
  EditWaredController.update
);

waredRouter.put(
  "/waredbox/updateOfficersAndBranches",
  isAuth,
  UpdateMokatbaOfficersAndBranchesContoller.updateOfficersAndBranches
);

waredRouter.delete(
  "/waredbox/deletewared",
  isAuth,
  DeleteWaredController.delete
);




export default waredRouter;
