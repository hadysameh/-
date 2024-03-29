import WaredController from "../../controllers/WaredController";
import express from "express";
import { Request, Response } from "express";
import { waredUpload } from "../../middelwares/multer";
import isAuth from "../../middelwares/isAuth";

const waredRouter = express.Router();

// router.post('/post',(req:Request,res:Response)=>{
//     console.log(req)
//     res.json('testing is done')

// })
waredRouter.get("/wared", isAuth, WaredController.getOne);
waredRouter.get("/wared/waredwithdeadline", isAuth, WaredController.getAllWaredWithDeadLine);

waredRouter.get(
  "/waredbox/getNumberOfUnreadWared",
  isAuth,
  WaredController.getNumberOfUnreadWared
);

waredRouter.get("/waredbox/search", isAuth, WaredController.getSearch);
waredRouter.post(
  "/waredbox/store",
  [isAuth, waredUpload.single("mokatbaPdf")],
  WaredController.store
);

waredRouter.put(
  "/waredbox/edit",
  [isAuth, waredUpload.single("mokatbaPdf")],
  WaredController.update
);

waredRouter.put(
  "/waredbox/updateOfficersAndBranches",
  isAuth,
  WaredController.updateOfficersAndBranches
);

waredRouter.delete("/waredbox/deletewared", isAuth, WaredController.delete);

export default waredRouter;
