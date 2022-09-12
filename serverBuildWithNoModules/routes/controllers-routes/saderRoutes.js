"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaderController_1 = __importDefault(require("../../controllers/SaderController"));
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../middelwares/multer");
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const saderRouter = express_1.default.Router();
saderRouter.get("/onesader", isAuth_1.default, SaderController_1.default.getOne);
saderRouter.get("/saderbox/getNumberOfUnreadSader", isAuth_1.default, SaderController_1.default.getNumberOfUnreadSader);
saderRouter.get("/saderbox/searchOptions", isAuth_1.default, SaderController_1.default.getSearchOptions);
saderRouter.get("/saderbox/search", isAuth_1.default, SaderController_1.default.getSearch);
saderRouter.post("/saderbox/store", [multer_1.saderUpload.single("mokatbaPdf"), isAuth_1.default], SaderController_1.default.store);
saderRouter.put("/saderbox/edit", [isAuth_1.default, multer_1.saderUpload.single("mokatbaPdf")], SaderController_1.default.update);
saderRouter.delete("/saderbox/deletesader", isAuth_1.default, SaderController_1.default.delete);
// waredRouter.put('/waredbox/edit', upload.single('mokatbaPdf'),SaderController.update)
exports.default = saderRouter;
