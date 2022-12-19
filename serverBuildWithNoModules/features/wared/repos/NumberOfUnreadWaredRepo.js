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
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const ConfigModel_1 = __importDefault(require("../../../models/ConfigModel"));
const sequelize_1 = require("sequelize");
const premissionsHelpers_1 = require("../../../helpers/premissionsHelpers");
class NumberOfUnreadWaredRepo {
    static getNumberOfUnreadWared(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let waredIncludeParams = [];
            let config = yield ConfigModel_1.default.findOne({
                where: {
                    id: 1,
                },
            });
            const hasAccessToAllWared = (0, premissionsHelpers_1.isHasAccessToAllWared)(req);
            const hasAccessToBranchWared = (0, premissionsHelpers_1.isHasAccessToBranchWared)(req);
            if (!hasAccessToAllWared) {
                if (hasAccessToBranchWared) {
                    waredIncludeParams.push({
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
                }
            }
            let numberOfWaredAfterLaunchForOfficer = yield WaredModel_1.default.count({
                where: {
                    doc_date: { [sequelize_1.Op.gte]: config === null || config === void 0 ? void 0 : config.getDataValue("dateOfLaunch") },
                },
                include: [...waredIncludeParams],
            });
            let numberOfreadWared = yield WaredModel_1.default.count({
                where: {
                    doc_date: { [sequelize_1.Op.gte]: config === null || config === void 0 ? void 0 : config.getDataValue("dateOfLaunch") },
                },
                include: [
                    ...waredIncludeParams,
                    {
                        model: OfficersModel_1.default,
                        where: { id: { [sequelize_1.Op.eq]: req.user.officerId } },
                        as: "WaredTrackingOfficers",
                    },
                ],
            });
            const numberOfUnreadWared = numberOfWaredAfterLaunchForOfficer - numberOfreadWared;
            return numberOfUnreadWared;
        });
    }
}
exports.default = NumberOfUnreadWaredRepo;
