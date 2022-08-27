import SaderController from "../../controllers/SaderController";
import express from "express";
import { Request, Response } from "express";
import { saderUpload } from "../../middelwares/multer";
import isAuth from "../../middelwares/isAuth";

const saderRouter = express.Router();

saderRouter.get("/onesader", isAuth, SaderController.getOne);

saderRouter.get(
  "/saderbox/getNumberOfUnreadSader",
  isAuth,
  SaderController.getNumberOfUnreadSader
);

saderRouter.get(
  "/saderbox/searchOptions",
  isAuth,
  SaderController.getSearchOptions
);
saderRouter.get("/saderbox/search", isAuth, SaderController.getSearch);
saderRouter.post(
  "/saderbox/store",
  [saderUpload.single("mokatbaPdf"), isAuth],
  SaderController.store
);
saderRouter.put(
  "/saderbox/edit",
  [isAuth, saderUpload.single("mokatbaPdf")],
  SaderController.update
);

saderRouter.delete(
  "/saderbox/deletesader",
  isAuth,
  SaderController.delete
);
// waredRouter.put('/waredbox/edit', upload.single('mokatbaPdf'),SaderController.update)
export default saderRouter;
