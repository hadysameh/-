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
const sequelize_1 = require("sequelize");
const premissionsHelpers_1 = require("../../../helpers/premissionsHelpers");
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const ConfigModel_1 = __importDefault(require("../../../models/ConfigModel"));
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
class NumberOfUnreadSaderController {
    static getNumberOfUnreadSader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let saderIncludeParams = [];
            let config = yield ConfigModel_1.default.findOne();
            const hasAccessToAllSader = (0, premissionsHelpers_1.isHasAccessToAllSader)(req);
            const hasAccessToBranchWared = (0, premissionsHelpers_1.isHasAccessToBranchWared)(req);
            if (!hasAccessToAllSader) {
                if (hasAccessToBranchWared) {
                    saderIncludeParams.push({
                        model: BranchesModel_1.default,
                        where: { id: req.user.officer.branches_id },
                    });
                }
                else {
                    saderIncludeParams.push({
                        model: OfficersModel_1.default,
                        as: "SaderOfficer",
                        where: { id: req.user.officerId },
                    });
                }
            }
            let numberOfSaderAfterLaunchForOfficer = yield SaderModel_1.default.count({
                where: {
                    doc_date: { [sequelize_1.Op.gte]: config === null || config === void 0 ? void 0 : config.getDataValue("dateOfLaunch") },
                },
                include: [...saderIncludeParams],
            });
            let numberOfTotalReadSader = yield SaderModel_1.default.count({
                where: {
                    doc_date: { [sequelize_1.Op.gte]: config === null || config === void 0 ? void 0 : config.getDataValue("dateOfLaunch") },
                },
                include: [
                    ...saderIncludeParams,
                    {
                        model: OfficersModel_1.default,
                        where: { id: { [sequelize_1.Op.eq]: req.user.officerId } },
                        as: "Sadertrackingofficers",
                    },
                ],
            });
            const NumberOfUnreadSader = numberOfSaderAfterLaunchForOfficer - numberOfTotalReadSader;
            res.json(NumberOfUnreadSader);
        });
    }
}
exports.default = NumberOfUnreadSaderController;
