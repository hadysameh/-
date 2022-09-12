"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WaredTrackingOfficersController_1 = __importDefault(require("../../controllers/WaredTrackingOfficersController"));
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const waredTrackingOfficersRouter = express_1.default.Router();
waredTrackingOfficersRouter.post("/waredtrackingofficers", isAuth_1.default, WaredTrackingOfficersController_1.default.store);
exports.default = waredTrackingOfficersRouter;
