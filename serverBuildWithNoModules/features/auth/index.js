"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.isAuth = void 0;
const isAuth_1 = __importDefault(require("./middelwares/isAuth"));
exports.isAuth = isAuth_1.default;
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
exports.authRouter = authRoutes_1.default;
