"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middelwares/isAuth"));
const authRouter = express_1.default.Router();
authRouter.post("/register", AuthController_1.default.register);
authRouter.post("/login", AuthController_1.default.login);
authRouter.post("/isauth", isAuth_1.default, AuthController_1.default.isAuth);
exports.default = authRouter;
