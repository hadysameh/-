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
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../models/GehaaModel"));
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const getTodaysDate_1 = __importDefault(require("../utils/getTodaysDate"));
const sequelize_1 = require("sequelize");
const ConfigModel_1 = __importDefault(require("../models/ConfigModel"));
const types_1 = require("../types");
const SadertrackingofficersModel_1 = __importDefault(require("../models/SadertrackingofficersModel"));
const Sader_GehaaModel_1 = __importDefault(require("../models/Sader_GehaaModel"));
class SaderRepo {
    static getNumberOfUnreadSader(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let saderIncludeParams = [];
            let config = yield ConfigModel_1.default.findOne();
            const hasAccessToAllWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToAllSader;
            }) || req.user.usertype.type === "admin";
            const hasAccessToBranchWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToBranchSader;
            });
            if (!hasAccessToAllWared) {
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
            let numberOfreadSader = yield SaderModel_1.default.count({
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
            // console.log({
            //   numberOfSaderAfterLaunchForOfficer,
            //   numberOfUnreadSader:
            //     numberOfSaderAfterLaunchForOfficer - numberOfreadSader,
            //   officerId: req.user.officerId,
            // });
            return numberOfSaderAfterLaunchForOfficer - numberOfreadSader;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let mokatba = yield SaderModel_1.default.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: OfficersModel_1.default,
                        as: "SaderOfficer",
                    },
                    WaredModel_1.default,
                    BranchesModel_1.default,
                    GehaaModel_1.default,
                ],
            });
            return mokatba;
        });
    }
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
            const hasAccessToAllSader = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToAllSader;
            }) || req.user.usertype.type === "admin";
            const hasAccessToBranchSader = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToBranchSader;
            });
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
            if (searchParams.lastWaredNum) {
                includeParams.push({
                    model: WaredModel_1.default,
                    where: { doc_num: searchParams.lastWaredNum },
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
                    WaredModel_1.default,
                    GehaaModel_1.default,
                    ...includeParams,
                ],
                limit: Number(searchParams.numOfRecords),
                order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
                offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
            });
            return saders;
        });
    }
    static store(reqBodyData, fileLocationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ reqBodyData, fileLocationPath });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield seqeulize_1.default.transaction();
                try {
                    // console.log({ selectedGehaat: reqBodyData.gehaat });
                    let selectedGehaat = JSON.parse(reqBodyData.gehaat);
                    let lastWared = yield WaredModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNum ? reqBodyData.lastWaredNum : "f",
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastWared_id = lastWared === null || lastWared === void 0 ? void 0 : lastWared.getDataValue("id");
                    let assistantBranch = yield BranchesModel_1.default.findOne({
                        where: {
                            id: reqBodyData.branch_id,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let assistantBranchId = assistantBranch === null || assistantBranch === void 0 ? void 0 : assistantBranch.getDataValue("id");
                    let storedSader = yield SaderModel_1.default.create({
                        doc_num: reqBodyData.doc_num,
                        doc_date: reqBodyData.doc_date,
                        branch_id: reqBodyData.branch_id,
                        subject: reqBodyData.subject,
                        known: reqBodyData.branch_id,
                        officer_id: reqBodyData.officer_id,
                        lastWared_id: lastWared_id ? lastWared_id : null,
                        register_date: (0, getTodaysDate_1.default)(),
                        type: reqBodyData.type,
                        register_user: "1",
                        attach: fileLocationPath,
                    });
                    let gehaatIdsObjs = selectedGehaat.map((branch) => {
                        return { id: branch.value };
                    });
                    let Sader_GehaaRows = gehaatIdsObjs.map((gehaaIdObj) => {
                        return {
                            sader_id: storedSader.getDataValue("id"),
                            gehaa_id: gehaaIdObj.id,
                        };
                    });
                    yield Sader_GehaaModel_1.default.bulkCreate(Sader_GehaaRows);
                    t.commit();
                    resolve();
                }
                catch (error) {
                    t.rollback();
                    reject(error);
                }
            }));
        });
    }
    static update(reqBodyData, fileLocationPath = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield seqeulize_1.default.transaction();
                try {
                    // console.log({reqBodyData});
                    let selectedGehaat = JSON.parse(reqBodyData.gehaat);
                    let lastWared = yield WaredModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNum,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastWared_id = lastWared ? lastWared.getDataValue("id") : null;
                    let assistantBranch = yield BranchesModel_1.default.findOne({
                        where: {
                            id: reqBodyData.branch_id,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let assistantBranchId = assistantBranch === null || assistantBranch === void 0 ? void 0 : assistantBranch.getDataValue("id");
                    let modifiedSaderData = {
                        doc_num: reqBodyData.doc_num,
                        doc_date: reqBodyData.doc_date,
                        branch_id: reqBodyData.branch_id,
                        subject: reqBodyData.subject,
                        known: reqBodyData.branch_id,
                        officer_id: reqBodyData.officer_id,
                        lastWared_id,
                        register_date: (0, getTodaysDate_1.default)(),
                        type: reqBodyData.type,
                        register_user: "1",
                    };
                    if (fileLocationPath) {
                        modifiedSaderData["attach"] = fileLocationPath;
                    }
                    let modifiedSader = yield SaderModel_1.default.update(modifiedSaderData, {
                        where: { id: reqBodyData["saderId"] },
                    });
                    yield SadertrackingofficersModel_1.default.destroy({
                        where: {
                            sader_id: reqBodyData["saderId"],
                        },
                    });
                    // await Sadertrackingofficers.bulkCreate([
                    //   {
                    //     officer_id: assistantBranchId,
                    //     sader_id: reqBodyData["saderId"],
                    //   },
                    //   {
                    //     officer_id: reqBodyData.officer_id,
                    //     sader_id: reqBodyData["saderId"],
                    //   },
                    // ]);
                    let gehaatIdsObjs = selectedGehaat.map((branch) => {
                        return { id: branch.value };
                    });
                    let Sader_GehaaRows = gehaatIdsObjs.map((gehaaIdObj) => {
                        return {
                            sader_id: reqBodyData["saderId"],
                            gehaa_id: gehaaIdObj.id,
                        };
                    });
                    // console.log({ Sader_GehaaRows });
                    yield Sader_GehaaModel_1.default.destroy({
                        where: {
                            sader_id: reqBodyData["saderId"],
                        },
                    });
                    yield Sader_GehaaModel_1.default.bulkCreate(Sader_GehaaRows);
                    t.commit();
                    resolve();
                }
                catch (error) {
                    t.rollback();
                    reject(error);
                }
            }));
        });
    }
    static delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let saderId = req.body.saderId;
                console.log({ saderId: req.body.saderId });
                SaderModel_1.default.destroy({
                    where: {
                        id: saderId,
                    },
                })
                    .then(() => {
                    resolve("deleted wared");
                })
                    .catch(() => {
                    reject("faild to delete wared");
                });
            });
        });
    }
}
exports.default = SaderRepo;
