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
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../../../models/GehaaModel"));
const premissionsHelpers_1 = require("../../../helpers/premissionsHelpers");
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
const sequelize_1 = require("sequelize");
class WaredBoxRepo {
    static getWithParams(searchParams, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let durationName = "get wared with params";
            // console.time(durationName);
            const hasAccessToAllWared = (0, premissionsHelpers_1.isHasAccessToAllWared)(req);
            const hasAccessToBranchWared = (0, premissionsHelpers_1.isHasAccessToBranchWared)(req);
            const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
            const addDaysToDate = (date, numOfDays) => {
                let tempDate = new Date(date);
                tempDate.setDate(tempDate.getDate() + Number(numOfDays));
                let result = new Date(tempDate)
                    .toISOString()
                    .slice(0, 19)
                    .replace(/T.*/, "");
                // console.log({ result });
                return result;
            };
            let whereParams = {};
            let includeParams = [];
            let orderByArr = [];
            if (searchParams.docNum) {
                whereParams["doc_num"] = `${searchParams.docNum}`;
            }
            if (searchParams.docDeptNum) {
                whereParams["doc_dept_num"] = `${searchParams.docDeptNum}`;
            }
            if (searchParams.gehaaId) {
                whereParams["gehaa_id"] = `${searchParams.gehaaId}`;
            }
            if (searchParams.subject) {
                whereParams["subject"] = {
                    [sequelize_1.Op.like]: `%${searchParams.subject}%`,
                };
            }
            if (searchParams.branchId) {
                includeParams.push({
                    model: BranchesModel_1.default,
                    where: { id: searchParams.branchId },
                });
            }
            if (searchParams.officerId) {
                includeParams.push({
                    model: OfficersModel_1.default,
                    as: "Wared_Officers",
                    where: { id: searchParams.officerId },
                });
            }
            if (searchParams.mokatbaDate) {
                whereParams["doc_date"] = `${searchParams.mokatbaDate}`;
            }
            if (searchParams.withinExcutionTimeType == "1") {
                if (searchParams.DaysBeforeExecution) {
                    whereParams["docDeadline"] = {
                        // $gt: new Date(),
                        [sequelize_1.Op.lte]: `${addDaysToDate(todaysDate, searchParams.DaysBeforeExecution)}`,
                    };
                    whereParams["closedSader_id"] = null;
                    whereParams["known"] = 0;
                    orderByArr.push(["docDeadline", "ASC"]);
                }
            }
            else if (searchParams.withinExcutionTimeType == "2") {
                if (searchParams.DaysBeforeExecution) {
                    whereParams["docDeadline"] = {
                        // $gt: new Date(),
                        [sequelize_1.Op.gt]: `${addDaysToDate(todaysDate, searchParams.DaysBeforeExecution)}`,
                    };
                    whereParams["closedSader_id"] = null;
                    whereParams["known"] = 0;
                    orderByArr.push(["docDeadline", "ASC"]);
                }
            }
            if (!hasAccessToAllWared) {
                if (hasAccessToBranchWared) {
                    includeParams.push({
                        model: BranchesModel_1.default,
                        where: { id: req.user.officer.branches_id },
                    });
                }
                else {
                    includeParams.push({
                        model: OfficersModel_1.default,
                        as: "Wared_Officers",
                        where: { id: req.user.officerId },
                    });
                }
            }
            // console.log({ includeParams });
            let wareds = yield WaredModel_1.default.findAll({
                where: whereParams,
                include: [
                    {
                        model: OfficersModel_1.default,
                        as: "Wared_Officers",
                    },
                    {
                        model: OfficersModel_1.default,
                        as: "WaredTrackingOfficers",
                    },
                    BranchesModel_1.default,
                    GehaaModel_1.default,
                    ...includeParams,
                ],
                limit: Number(searchParams.numOfRecords),
                order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
                offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
            });
            return wareds;
        });
    }
}
exports.default = WaredBoxRepo;
