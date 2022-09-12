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
const Premissions_1 = __importDefault(require("../models/NewAuthModels/Premissions"));
const User_1 = __importDefault(require("../models/NewAuthModels/User"));
const UserTypes_1 = __importDefault(require("../models/NewAuthModels/UserTypes"));
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
const RanksMode_1 = __importDefault(require("../models/RanksMode"));
class AuthRepo {
    static storeUser(useData) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let storedUser = yield User_1.default.create({
                        userName: useData.userName,
                        password: useData.password,
                        firstName: useData.firstName,
                        lastName: useData.lastName,
                        email: useData.email,
                    });
                    resolve(storedUser);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static getUserByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let user = yield User_1.default.findOne({
                        where: {
                            userName: userName,
                        },
                        include: [
                            { model: UserTypes_1.default, include: [Premissions_1.default] },
                            { model: OfficersModel_1.default, include: [RanksMode_1.default] },
                        ],
                    });
                    resolve(user);
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            }));
        });
    }
    static editUser() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = AuthRepo;
