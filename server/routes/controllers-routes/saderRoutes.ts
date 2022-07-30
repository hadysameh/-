import SaderController from "../../controllers/SaderController";
import express from "express";
import { Request, Response } from "express";
import { saderUpload } from "../../middelwares/multer";

const saderRouter = express.Router();

saderRouter.get("/onesader", SaderController.getOne);
// waredRouter.get('/waredbox',WaredController.get)
saderRouter.get("/saderbox/searchOptions", SaderController.getSearchOptions);
saderRouter.get("/saderbox/search", SaderController.getSearch);
saderRouter.post(
  "/saderbox/store",
  saderUpload.single("mokatbaPdf"),
  SaderController.store
);
saderRouter.put('/saderbox/edit', saderUpload.single('mokatbaPdf'),SaderController.update)

// waredRouter.put('/waredbox/edit', upload.single('mokatbaPdf'),SaderController.update)
export default saderRouter;
