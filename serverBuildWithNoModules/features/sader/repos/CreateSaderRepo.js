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
const getTodaysDate_1 = __importDefault(require("../../../helpers/getTodaysDate"));
const Sader_GehaaModel_1 = __importDefault(require("../../../models/Sader_GehaaModel"));
const closeOpenWared_1 = __importDefault(require("./helpers/closeOpenWared"));
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
class CreateSaderRepo {
    static store(reqBodyData, fileLocationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ reqBodyData, fileLocationPath });
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const transaction = yield db_1.default.transaction();
                try {
                    // console.log({ selectedGehaat: reqBodyData.gehaat });
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
                    let lastWared_id = lastWared === null || lastWared === void 0 ? void 0 : lastWared.getDataValue("id");
                    console.log({ lastWared_id });
                    let lastSader = yield SaderModel_1.default.findOne({
                        where: {
                            doc_num: reqBodyData.lastWaredNumber,
                            year: reqBodyData.lastSaderYear,
                        },
                    }).catch((err) => {
                        return null;
                    });
                    let lastSader_id = lastSader === null || lastSader === void 0 ? void 0 : lastSader.getDataValue("id");
                    // let assistantBranch = await Branches.findOne({
                    //   where: {
                    //     id: reqBodyData.branch_id,
                    //   },
                    // }).catch((err) => {
                    //   return null;
                    // });
                    // let assistantBranchId = assistantBranch?.getDataValue("id");
                    let storedSader = yield SaderModel_1.default.create({
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
                        attach: fileLocationPath,
                    });
                    if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
                        yield (0, closeOpenWared_1.default)(reqBodyData["selectedMokatbatWithDeadLineForSader"], storedSader.getDataValue("id"));
                    }
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
                    transaction.commit();
                    resolve();
                }
                catch (error) {
                    transaction.rollback();
                    reject(error);
                }
            }));
        });
    }
}
exports.default = CreateSaderRepo;
