"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeController_1 = __importDefault(require("../../controllers/HomeController"));
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../../middelwares/isAuth"));
const homeRouter = express_1.default.Router();
homeRouter.get("/home", isAuth_1.default, HomeController_1.default.index);
exports.default = homeRouter;
