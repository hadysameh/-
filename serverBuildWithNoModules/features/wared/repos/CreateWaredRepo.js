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
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const Wared_BranchesModel_1 = __importDefault(require("../../../models/Wared_BranchesModel"));
const Wared_OfficersModel_1 = __importDefault(require("../../../models/Wared_OfficersModel"));
const db_1 = __importDefault(require("../../../db"));
const sequelize_1 = require("sequelize");
class CreateWaredRepo {
    static store(reqBodyData, fileLocationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ reqBodyData });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield db_1.default.transaction();
                try {
                    let selectedBranchs = JSON.parse(reqBodyData.selectedBranchs);
                    let selectedOfficers = JSON.parse(reqBodyData.selectedOfficers);
                    let branchesIdsObjs = selectedBranchs.map((branch) => {
                        return { id: branch.value };
                    });
                    let officersIdsObjs = selectedOfficers.map((selectedOfficer) => {
                        return { id: selectedOfficer.value };
                    });
                    let branchesIdsArr = selectedBranchs.map((branch) => {
                        return branch.value;
                    });
                    let lastWared = yield WaredModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNumber,
                            gehaa_id: reqBodyData.lastWaredGeha_id,
                            year: reqBodyData.lastWaredYear,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastWared_id = lastWared === null || lastWared === void 0 ? void 0 : lastWared.getDataValue("id");
                    let storedWared = yield WaredModel_1.default.create({
                        doc_num: reqBodyData.doc_num,
                        doc_dept_num: reqBodyData.doc_dept_num,
                        doc_date: reqBodyData.doc_date,
                        subject: reqBodyData.subject,
                        docDeadline: reqBodyData.hasDeadLine == "true" ? reqBodyData.docDeadline : null,
                        gehaa_id: reqBodyData.gehaa_id,
                        known: reqBodyData.docDeadline ? "0" : "1",
                        deliver_date: reqBodyData.deliver_date,
                        lastWared_id,
                        type: reqBodyData.type,
                        register_user: "1",
                        attach: fileLocationPath,
                    });
                    let wared_branches_rows = branchesIdsObjs.map((brancheIdObj) => {
                        return {
                            wared_id: storedWared.getDataValue("id"),
                            branches_id: brancheIdObj.id,
                        };
                    });
                    let wared_officers_rows = officersIdsObjs.map((officerIdObj) => {
                        return {
                            wared_id: storedWared.getDataValue("id"),
                            officers_id: officerIdObj.id,
                        };
                    });
                    // console.log({ wared_branches_rows, wared_officers_rows });
                    // let stored_wared_officers_rows = branchesIdsObjs.map();
                    let stored_wared_branches = yield Wared_BranchesModel_1.default.bulkCreate(wared_branches_rows);
                    let stored_wared_officers = yield Wared_OfficersModel_1.default.bulkCreate(wared_officers_rows);
                    let selectedBranchesManagers = yield BranchesModel_1.default.findAll({
                        where: {
                            id: {
                                [sequelize_1.Op.in]: branchesIdsArr,
                            },
                        },
                    });
                    yield t.commit();
                    resolve();
                }
                catch (error) {
                    // console.log(error)
                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    yield t.rollback();
                    reject(error);
                }
            }));
        });
    }
}
exports.default = CreateWaredRepo;
