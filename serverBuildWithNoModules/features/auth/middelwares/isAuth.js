"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../../models/User"));
const UserTypes_1 = __importDefault(require("../../../models/UserTypes"));
const Premissions_1 = __importDefault(require("../../../models/Premissions"));
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let privateKey = String(process.env.jwtKey);
            let token = req.headers["authorization"];
            if (token === "null") {
                res.status(403).json({ msg: "unautherized" });
            }
            else if (token) {
                var decoded = jsonwebtoken_1.default.verify(token, privateKey);
                let user = yield User_1.default.findOne({
                    where: {
                        id: decoded,
                    },
                    include: [
                        { model: UserTypes_1.default, include: [Premissions_1.default] },
                        { model: OfficersModel_1.default, include: [BranchesModel_1.default] },
                    ],
                }).catch(() => {
                    return null;
                });
                if (user) {
                    // console.log({ user: JSON.stringify(user) });
                    req.user = user;
                    next();
                }
                else {
                    res.status(403).json({ msg: "unautherized" });
                }
            }
            else {
                res.status(403).json({ msg: "unautherized" });
            }
        }
        catch (error) {
            console.log(error);
        }
        // console.log(decoded.foo)
    });
}
exports.default = isAuth;
