"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SaderOptionsController_1 = __importDefault(require("../../controllers/SaderOptionsController"));
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const saderOptionsRouter = express_1.default.Router();
saderOptionsRouter.get("/saderoptions", isAuth_1.default, SaderOptionsController_1.default.get);
exports.default = saderOptionsRouter;
