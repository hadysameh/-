"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaderTrackingOfficersController_1 = __importDefault(require("../../controllers/SaderTrackingOfficersController"));
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const saderTrackingOfficersRouter = express_1.default.Router();
saderTrackingOfficersRouter.post("/sadertrackingofficers", isAuth_1.default, SaderTrackingOfficersController_1.default.store);
exports.default = saderTrackingOfficersRouter;
