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
const db_1 = __importDefault(require("../../../db"));
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
const getTodaysDate_1 = __importDefault(require("../../../helpers/getTodaysDate"));
const Sader_GehaaModel_1 = __importDefault(require("../../../models/Sader_GehaaModel"));
const closeOpenWared_1 = __importDefault(require("./helpers/closeOpenWared"));
const reopenWaredThatWasClosedByTHisSader_1 = __importDefault(require("./helpers/reopenWaredThatWasClosedByTHisSader"));
const SadertrackingofficersModel_1 = __importDefault(require("../../../models/SadertrackingofficersModel"));
class EditSaderRepo {
    static update(reqBodyData, fileLocationPath = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield db_1.default.transaction();
                try {
                    // console.log({reqBodyData});
                    let selectedGehaat = JSON.parse(reqBodyData.gehaat);
                    let lastWared = yield WaredModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNumber,
                            gehaa_id: reqBodyData.lastWaredGeha_id,
                            year: reqBodyData.lastWaredYear,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastWared_id = lastWared ? lastWared.getDataValue("id") : null;
                    let lastSader = yield SaderModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastSaderNumber,
                            year: reqBodyData.lastSaderYear,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastSader_id = lastSader === null || lastSader === void 0 ? void 0 : lastSader.getDataValue("id");
                    console.log({ lastSader_id });
                    let modifiedSaderData = {
                        doc_num: reqBodyData.doc_num,
                        doc_date: reqBodyData.doc_date,
                        branch_id: reqBodyData.branch_id,
                        subject: reqBodyData.subject,
                        known: reqBodyData.branch_id,
                        officer_id: reqBodyData.officer_id,
                        lastWared_id: lastWared_id ? lastWared_id : null,
                        lastSader_id: lastSader_id ? lastSader_id : null,
                        register_date: (0, getTodaysDate_1.default)(),
                        type: reqBodyData.type,
                        register_user: "1",
                    };
                    if (fileLocationPath) {
                        modifiedSaderData["attach"] = fileLocationPath;
                    }
                    yield SaderModel_1.default.update(modifiedSaderData, {
                        where: { id: reqBodyData["saderId"] },
                    });
                    if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
                        yield (0, reopenWaredThatWasClosedByTHisSader_1.default)(reqBodyData["saderId"]);
                        yield (0, closeOpenWared_1.default)(reqBodyData["selectedMokatbatWithDeadLineForSader"], reqBodyData["saderId"]);
                    }
                    yield SadertrackingofficersModel_1.default.destroy({
                        where: {
                            sader_id: reqBodyData["saderId"],
                        },
                    });
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
}
exports.default = EditSaderRepo;
