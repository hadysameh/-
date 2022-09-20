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
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../models/GehaaModel"));
const Wared_BranchesModel_1 = __importDefault(require("../models/Wared_BranchesModel"));
const Wared_OfficersModel_1 = __importDefault(require("../models/Wared_OfficersModel"));
const WaredTrackingOfficersModel_1 = __importDefault(require("../models/WaredTrackingOfficersModel"));
const seqeulize_1 = __importDefault(require("../db/seqeulize"));
const ConfigModel_1 = __importDefault(require("../models/ConfigModel"));
const sequelize_1 = require("sequelize");
const types_1 = require("../types");
// import dateFormat from 'date-format'
class WaredRepo {
    static getNumberOfUnreadWared(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let waredIncludeParams = [];
            let config = yield ConfigModel_1.default.findOne({
                where: {
                    id: 1,
                },
            });
            const hasAccessToAllWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToAllWared;
            }) || req.user.usertype.type === "admin";
            const hasAccessToBranchWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToBranchWared;
            });
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
            // console.log({
            //   numberOfUnreadWared:
            //     numberOfWaredAfterLaunchForOfficer - numberOfreadWared,
            //   officerId: req.user.officerId,
            // });
            return numberOfWaredAfterLaunchForOfficer - numberOfreadWared;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let mokatba = yield WaredModel_1.default.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: OfficersModel_1.default,
                        as: "Wared_Officers",
                    },
                    BranchesModel_1.default,
                    GehaaModel_1.default,
                ],
            });
            return mokatba;
        });
    }
    static get(pageNum, numOfRecords) {
        return __awaiter(this, void 0, void 0, function* () { });
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
                    // console.log(values);
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
            const hasAccessToAllWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToAllWared;
            }) || req.user.usertype.type === "admin";
            const hasAccessToBranchWared = req.user.usertype.premissions.find((premission) => {
                return premission.premission === types_1.premissions.hasAccessToBranchWared;
            });
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
                // whereParams["branches_id"] = `${searchParams.branchId}`;
            }
            if (searchParams.officerId) {
                includeParams.push({
                    model: OfficersModel_1.default,
                    as: "Wared_Officers",
                    where: { id: searchParams.officerId },
                });
                // whereParams["id"] = `${searchParams.officerId}`;
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
                    orderByArr.push(["docDeadline", "DESC"]);
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
                    orderByArr.push(["docDeadline", "DESC"]);
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
    static store(reqBodyData, fileLocationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ reqBodyData });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield seqeulize_1.default.transaction();
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
                            doc_num: reqBodyData.lastWaredNum,
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
                    /*
                    //this should be consists of the officers ids and branches managers ids
            
                    //pt1 for the branches managers
                    let waredTrackingOfficersRowsPt1 = selectedBranchesManagers.map(
                      (selectedBranchesManagers) => {
                        return {
                          wared_id: storedWared.getDataValue("id"),
                          officer_id: selectedBranchesManagers.getDataValue("manager_id"),
                        };
                      }
                    );
            
                    //pt2 for the officers
                    let waredTrackingOfficersRowsPt2 = officersIdsObjs.map(
                      (officerIdObj) => {
                        return {
                          wared_id: Number(storedWared.getDataValue("id")),
                          officer_id: officerIdObj.id,
                        };
                      }
                    );
                    let waredtrackingOfficersRows = [
                      ...waredTrackingOfficersRowsPt1,
                      ...waredTrackingOfficersRowsPt2,
                    ];
                    // console.log({stored_wared_officers});
                    let storedWaredTrackingOfficers = await WaredTrackingOfficers.bulkCreate(
                      waredtrackingOfficersRows
                    );*/
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
    static update(reqBodyData, fileLocationPath = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield seqeulize_1.default.transaction();
                try {
                    let selectedBranchs = JSON.parse(reqBodyData.selectedBranchs);
                    let selectedOfficers = JSON.parse(reqBodyData.selectedOfficers);
                    let branchesIdsObjs = selectedBranchs.map((branch) => {
                        return { id: branch.value };
                    });
                    let officersIdsObjs = selectedOfficers.map((selectedOfficer) => {
                        return { id: selectedOfficer.value };
                    });
                    // console.log({ officersIdsObjs });
                    let branchesIdsArr = selectedBranchs.map((branch) => {
                        return branch.value;
                    });
                    let lastWared = yield WaredModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNum,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastWared_id = lastWared === null || lastWared === void 0 ? void 0 : lastWared.getDataValue("id");
                    let modifiedWaredData = {
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
                    };
                    if (fileLocationPath) {
                        modifiedWaredData["attach"] = fileLocationPath;
                    }
                    let modifiedWared = yield WaredModel_1.default.update(modifiedWaredData, {
                        where: { id: reqBodyData["waredId"] },
                    });
                    let wared_branches_rows = branchesIdsObjs.map((brancheIdObj) => {
                        return {
                            wared_id: reqBodyData["waredId"],
                            branches_id: brancheIdObj.id,
                        };
                    });
                    let wared_officers_rows = officersIdsObjs.map((officerIdObj) => {
                        return {
                            wared_id: reqBodyData["waredId"],
                            officers_id: officerIdObj.id,
                        };
                    });
                    // console.log({ wared_branches_rows, wared_officers_rows });
                    yield Wared_BranchesModel_1.default.destroy({
                        where: {
                            wared_id: reqBodyData["waredId"],
                        },
                    });
                    yield Wared_OfficersModel_1.default.destroy({
                        where: {
                            wared_id: reqBodyData["waredId"],
                        },
                    });
                    yield Wared_BranchesModel_1.default.bulkCreate(wared_branches_rows, {
                        updateOnDuplicate: ["wared_id"],
                    });
                    yield Wared_OfficersModel_1.default.bulkCreate(wared_officers_rows, {
                        updateOnDuplicate: ["wared_id"],
                    });
                    let selectedBranchesManagers = yield BranchesModel_1.default.findAll({
                        where: {
                            id: {
                                [sequelize_1.Op.in]: branchesIdsArr,
                            },
                        },
                    });
                    //this should be consists of the officers ids and branches managers ids
                    //pt1 for the branches managers
                    // let waredTrackingOfficersRowsPt1 = selectedBranchesManagers.map(
                    //   (selectedBranchesManagers) => {
                    //     return {
                    //       wared_id: reqBodyData["waredId"],
                    //       officer_id: selectedBranchesManagers.getDataValue("manager_id"),
                    //     };
                    //   }
                    // );
                    // //pt2 for the officers
                    // let waredTrackingOfficersRowsPt2 = officersIdsObjs.map(
                    //   (officerIdObj) => {
                    //     return {
                    //       wared_id: Number(reqBodyData["waredId"]),
                    //       officer_id: officerIdObj.id,
                    //     };
                    //   }
                    // );
                    // let waredtrackingOfficersRows = [
                    //   ...waredTrackingOfficersRowsPt1,
                    //   ...waredTrackingOfficersRowsPt2,
                    // ];
                    yield WaredTrackingOfficersModel_1.default.destroy({
                        where: {
                            wared_id: reqBodyData["waredId"],
                        },
                    });
                    yield t.commit();
                    resolve();
                }
                catch (error) {
                    console.log(error);
                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    yield t.rollback();
                    reject("");
                }
            }));
        });
    }
    static updateOfficersAndBranches(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield seqeulize_1.default.transaction();
                try {
                    req.body.selectedBranchs;
                    // console.log({ body: req.body });
                    const waredId = req.body["waredId"];
                    let selectedBranchs = JSON.parse(req.body.selectedBranchs);
                    let selectedOfficers = JSON.parse(req.body.selectedOfficers);
                    let branchesIdsObjs = selectedBranchs.map((branch) => {
                        return { id: branch.value };
                    });
                    let officersIdsObjs = selectedOfficers.map((selectedOfficer) => {
                        return { id: selectedOfficer.value };
                    });
                    // await Wared.update(c,{ where: { id: reqBodyData["waredId"] }})
                    yield Wared_BranchesModel_1.default.destroy({
                        where: {
                            wared_id: waredId,
                        },
                    });
                    yield Wared_OfficersModel_1.default.destroy({
                        where: {
                            wared_id: waredId,
                        },
                    });
                    let wared_branchesRows = branchesIdsObjs.map((brancheIdObj) => {
                        return {
                            wared_id: waredId,
                            branches_id: brancheIdObj.id,
                        };
                    });
                    let wared_officersRows = officersIdsObjs.map((officerIdObj) => {
                        return {
                            wared_id: waredId,
                            officers_id: officerIdObj.id,
                        };
                    });
                    // console.log({ wared_branchesRows, wared_officersRows });
                    yield Wared_BranchesModel_1.default.bulkCreate(wared_branchesRows, {
                        updateOnDuplicate: ["wared_id"],
                    });
                    yield Wared_OfficersModel_1.default.bulkCreate(wared_officersRows, {
                        updateOnDuplicate: ["wared_id"],
                    });
                    yield t.commit();
                    resolve();
                }
                catch (error) {
                    console.log(error);
                    // If the execution reaches this line, an error was thrown.
                    // We rollback the transaction.
                    yield t.rollback();
                    reject("");
                }
            }));
        });
    }
    static deleteWared(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // console.log({waredId:req.body.waredId})
                let waredId = req.body.waredId;
                WaredModel_1.default.destroy({
                    where: {
                        id: waredId,
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
exports.default = WaredRepo;
