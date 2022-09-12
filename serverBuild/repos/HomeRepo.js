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
const WaredModel_1 = __importDefault(require("../models/WaredModel"));
const SaderModel_1 = __importDefault(require("../models/SaderModel"));
const sequelize_1 = require("sequelize");
const getTodaysDate_1 = __importDefault(require("../utils/getTodaysDate"));
const addDaysToDate_1 = __importDefault(require("../utils/addDaysToDate"));
const BranchesModel_1 = __importDefault(require("../models/BranchesModel"));
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
const daysBeforeExec = 7;
class HomeRepo {
    static index(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const hasAccessToAllWared = req.user.userType.premissions.find((premission) => {
                    return premission.premission === "has access to all wared";
                }) || req.user.userType.type === "admin";
                const hasAccessToBranchWared = req.user.userType.premissions.find((premission) => {
                    return premission.premission === "has access to branch wared";
                });
                let waredIncludeParams = [];
                let saderIncludeParams = [];
                if (!hasAccessToAllWared) {
                    if (hasAccessToBranchWared) {
                        waredIncludeParams.push({
                            model: BranchesModel_1.default,
                            where: { id: req.user.officer.branches_id },
                        });
                        saderIncludeParams.push({
                            model: BranchesModel_1.default,
                            where: { id: req.user.officer.branches_id },
                        });
                    }
                    else {
                        waredIncludeParams.push({
                            model: OfficersModel_1.default,
                            as: "Wared_Officers",
                            where: { id: req.user.officerId },
                        });
                        saderIncludeParams.push({
                            model: OfficersModel_1.default,
                            as: "SaderOfficer",
                            where: { id: req.user.officerId },
                        });
                    }
                }
                let waredCount = yield WaredModel_1.default.count({ include: waredIncludeParams });
                let saderCount = yield SaderModel_1.default.count({ include: saderIncludeParams });
                let redCircleCount = yield WaredModel_1.default.count({
                    include: waredIncludeParams,
                    where: [
                        {
                            docDeadline: {
                                [sequelize_1.Op.lte]: `${(0, addDaysToDate_1.default)((0, getTodaysDate_1.default)(), daysBeforeExec)}`,
                            },
                            closedSader_id: null,
                            known: 0,
                        },
                    ],
                });
                let greenCircleCount = yield WaredModel_1.default.count({
                    include: waredIncludeParams,
                    where: [
                        {
                            docDeadline: {
                                // $gt: new Date(),
                                [sequelize_1.Op.gt]: `${(0, addDaysToDate_1.default)((0, getTodaysDate_1.default)(), daysBeforeExec)}`,
                            },
                            closedSader_id: null,
                            known: 0,
                        },
                    ],
                });
                resolve({
                    waredCount,
                    saderCount,
                    redCircleCount,
                    greenCircleCount,
                });
            }));
        });
    }
}
exports.default = HomeRepo;
