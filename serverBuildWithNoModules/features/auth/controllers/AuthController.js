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
const AuthRepo_1 = __importDefault(require("../repos/AuthRepo"));
const bcrypt_1 = require("../../../helpers/bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                const userData = {
                    userName: data.userName,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email ? data.email : null,
                };
                // console.log({ userData });
                let storedUser = yield AuthRepo_1.default.storeUser(userData);
                res.status(200).json(storedUser);
            }
            catch (error) {
                console.log({ error });
                res.status(400).json({
                    msg: "failed to store",
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                let { userName, password } = data;
                let user = yield AuthRepo_1.default.getUserByUserName(userName).catch(() => {
                    return null;
                });
                if (user) {
                    let isCorrectPassword = yield (0, bcrypt_1.compareHashed)(password, user.password);
                    if (isCorrectPassword) {
                        let privateKey = String(process.env.jwtKey);
                        let token = jsonwebtoken_1.default.sign(user.id, privateKey);
                        res.json({ user, token });
                    }
                    else {
                        res.status(403).json({ msg: "password is incorrect" });
                    }
                }
                else {
                    res.status(403).json({ msg: "userName is incorrect or not exists" });
                }
            }
            catch (error) {
                console.log({ msg: 'error in login', error });
            }
        });
    }
    static isAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(req.user);
        });
    }
}
exports.default = AuthController;
