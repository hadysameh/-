"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaderBoxController_1 = __importDefault(require("../controllers/SaderBoxController"));
const SaderDetailsPreviewController_1 = __importDefault(require("../controllers/SaderDetailsPreviewController"));
const EditSaderController_1 = __importDefault(require("../controllers/EditSaderController"));
const DeleteSaderController_1 = __importDefault(require("../controllers/DeleteSaderController"));
const CreateSaderController_1 = __importDefault(require("../controllers/CreateSaderController"));
const NumberOfUnreadSaderController_1 = __importDefault(require("../controllers/NumberOfUnreadSaderController"));
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../middelwares/multer");
const isAuth_1 = __importDefault(require("../../auth/middelwares/isAuth"));
const SaderTrackingOfficersController_1 = __importDefault(require("../controllers/SaderTrackingOfficersController"));
const WaredOptionsController_1 = __importDefault(require("../../wared/controllers/WaredOptionsController"));
const saderRouter = express_1.default.Router();
saderRouter.get("/onesader", isAuth_1.default, SaderDetailsPreviewController_1.default.getOne);
saderRouter.get("/saderbox/getNumberOfUnreadSader", isAuth_1.default, NumberOfUnreadSaderController_1.default.getNumberOfUnreadSader);
saderRouter.get("/saderbox/searchOptions", isAuth_1.default, SaderBoxController_1.default.getSearchOptions);
saderRouter.get("/saderbox/search", isAuth_1.default, SaderBoxController_1.default.getSearch);
//same search options as wared
saderRouter.get("/saderoptions", isAuth_1.default, WaredOptionsController_1.default.get);
saderRouter.post("/saderbox/store", [multer_1.saderUpload.single("mokatbaPdf"), isAuth_1.default], CreateSaderController_1.default.store);
saderRouter.post("/sadertrackingofficers", isAuth_1.default, SaderTrackingOfficersController_1.default.store);
saderRouter.put("/saderbox/edit", [isAuth_1.default, multer_1.saderUpload.single("mokatbaPdf")], EditSaderController_1.default.update);
saderRouter.delete("/saderbox/deletesader", isAuth_1.default, DeleteSaderController_1.default.delete);
exports.default = saderRouter;
