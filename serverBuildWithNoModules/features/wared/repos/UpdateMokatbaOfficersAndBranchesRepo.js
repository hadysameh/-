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
const Wared_BranchesModel_1 = __importDefault(require("../../../models/Wared_BranchesModel"));
const Wared_OfficersModel_1 = __importDefault(require("../../../models/Wared_OfficersModel"));
const db_1 = __importDefault(require("../../../db"));
class UpdateMokatbaOfficersAndBranchesRepo {
    static updateOfficersAndBranches(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const t = yield db_1.default.transaction();
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
}
exports.default = UpdateMokatbaOfficersAndBranchesRepo;
