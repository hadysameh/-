import SaderController from "../../controllers/SaderController";
import express from "express";
import { Request, Response } from "express";
import { saderUpload } from "../../middelwares/multer";
import isAuth from "../../middelwares/isAuth";

const saderRouter = express.Router();

saderRouter.get("/onesader", isAuth, SaderController.getOne);
// waredRouter.get('/waredbox',WaredController.get)
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

// waredRouter.put('/waredbox/edit', upload.single('mokatbaPdf'),SaderController.update)
export default saderRouter;
