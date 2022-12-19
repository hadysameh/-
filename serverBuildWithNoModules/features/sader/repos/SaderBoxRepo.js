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
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../../../models/GehaaModel"));
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const sequelize_1 = require("sequelize");
const premissionsHelpers_1 = require("../../../helpers/premissionsHelpers");
const getTodaysDate_1 = __importDefault(require("../../../helpers/getTodaysDate"));
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
class SaderBoxRepo {
    static getSearchOptions(searchParams = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const getGehaat = () => __awaiter(this, void 0, void 0, function* () {
                let gehaat = yield GehaaModel_1.default.findAll();
                return gehaat;
            });
            const getBranches = () => __awaiter(this, void 0, void 0, function* () {
                let branches = yield BranchesModel_1.default.findAll();
                return branches;
            });
            const getOfficers = () => __awaiter(this, void 0, void 0, function* () {
                let officers = yield OfficersModel_1.default.findAll();
                return officers;
            });
            return new Promise((resolve, reject) => {
                Promise.all([getGehaat(), getBranches(), getOfficers()])
                    .then((values) => {
                    let result = {
                        gehaat: values[0],
                        branches: values[1],
                        officers: values[2],
                    };
                    resolve(result);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    static getWithParams(searchParams, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let durationName = "get sader with params";
            // console.time(durationName)
            const hasAccessToAllSader = (0, premissionsHelpers_1.isHasAccessToAllSader)(req);
            const hasAccessToBranchSader = (0, premissionsHelpers_1.isHasAccessToBranchSader)(req);
            const todaysDate = (0, getTodaysDate_1.default)();
            let whereParams = {};
            let includeParams = [];
            let orderByArr = [];
            if (searchParams.docNum) {
                whereParams["doc_num"] = `${searchParams.docNum}`;
            }
            if (searchParams.gehaaId) {
                includeParams.push({
                    model: GehaaModel_1.default,
                    where: { id: searchParams.gehaaId },
                });
                // whereParams["gehaa_id"] = `${searchParams.gehaaId}`;
            }
            if (searchParams.subject) {
                whereParams["subject"] = {
                    [sequelize_1.Op.like]: `%${searchParams.subject}%`,
                };
            }
            if (searchParams.branchId) {
                whereParams["branch_id"] = `${searchParams.branchId}`;
            }
            if (searchParams.officerId) {
                whereParams["officer_id"] = `${searchParams.officerId}`;
            }
            if (searchParams.mokatbaDate) {
                whereParams["doc_date"] = `${searchParams.mokatbaDate}`;
            }
            if (searchParams.closedWaredDocNum) {
                includeParams.push(
                //   {
                //   model: Wared,
                //   as: "lastWared",
                //   where: { doc_num: searchParams.closedWaredDocNum },
                // },
                {
                    model: WaredModel_1.default,
                    as: "waredClosedSader",
                    where: { doc_num: searchParams.closedWaredDocNum },
                });
                // whereParams["branch_id"] = `${searchParams.branchId}`;
            }
            if (!hasAccessToAllSader) {
                if (hasAccessToBranchSader) {
                    includeParams.push({
                        model: BranchesModel_1.default,
                        where: { id: req.user.officer.branches_id },
                    });
                }
                else {
                    includeParams.push({
                        model: OfficersModel_1.default,
                        as: "SaderOfficer",
                        where: { id: req.user.officerId },
                    });
                }
            }
            // console.log({ whereParams });
            let saders = yield SaderModel_1.default.findAll({
                where: whereParams,
                include: [
                    {
                        model: OfficersModel_1.default,
                        as: "SaderOfficer",
                    },
                    {
                        model: OfficersModel_1.default,
                        as: "Sadertrackingofficers",
                    },
                    BranchesModel_1.default,
                    {
                        model: WaredModel_1.default,
                        as: "waredClosedSader",
                    },
                    GehaaModel_1.default,
                    ...includeParams,
                ],
                limit: Number(searchParams.numOfRecords),
                order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
                offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
            });
            // console.timeEnd(durationName)
            // console.log({ saders });
            return saders;
        });
    }
}
exports.default = SaderBoxRepo;
