"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WaredController_1 = __importDefault(require("../../controllers/WaredController"));
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../middelwares/multer");
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const waredRouter = express_1.default.Router();
// router.post('/post',(req:Request,res:Response)=>{
//     console.log(req)
//     res.json('testing is done')
// })
waredRouter.get("/wared", isAuth_1.default, WaredController_1.default.getOne);
waredRouter.get("/waredbox/getNumberOfUnreadWared", isAuth_1.default, WaredController_1.default.getNumberOfUnreadWared);
waredRouter.get("/waredbox/search", isAuth_1.default, WaredController_1.default.getSearch);
waredRouter.post("/waredbox/store", [isAuth_1.default, multer_1.waredUpload.single("mokatbaPdf")], WaredController_1.default.store);
waredRouter.put("/waredbox/edit", [isAuth_1.default, multer_1.waredUpload.single("mokatbaPdf")], WaredController_1.default.update);
waredRouter.put("/waredbox/updateOfficersAndBranches", isAuth_1.default, WaredController_1.default.updateOfficersAndBranches);
waredRouter.delete("/waredbox/deletewared", isAuth_1.default, WaredController_1.default.delete);
exports.default = waredRouter;
