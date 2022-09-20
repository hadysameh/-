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
const GehaaModel_1 = __importDefault(require("../models/GehaaModel"));
const BranchesModel_1 = __importDefault(require("../models/BranchesModel"));
const OfficersModel_1 = __importDefault(require("../models/OfficersModel"));
const types_1 = require("../types");
class WaredOptionsController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getGehaat = () => __awaiter(this, void 0, void 0, function* () {
                let gehaat = yield GehaaModel_1.default.findAll();
                return gehaat;
            });
            const getBranches = () => __awaiter(this, void 0, void 0, function* () {
                let branches;
                const hasAccessToAllBranches = req.user.usertype.premissions
                    .map((premission) => premission.premission)
                    .includes(types_1.premissions.hasAccessToAllBranches) ||
                    req.user.usertype.type === "admin";
                if (hasAccessToAllBranches) {
                    branches = yield BranchesModel_1.default.findAll();
                }
                else {
                    branches = [];
                }
                return branches;
            });
            const getOfficers = () => __awaiter(this, void 0, void 0, function* () {
                let officers;
                const hasAccessToAllOfficers = req.user.usertype.premissions.find((premission) => {
                    return premission.premission === types_1.premissions.hasAccessToAllOfficers;
                }) || req.user.usertype.type === "admin";
                const hasAccessToBranchOfficers = req.user.usertype.premissions.find((premission) => {
                    return (premission.premission === types_1.premissions.hasAccessToBranchOfficers);
                });
                if (hasAccessToAllOfficers) {
                    officers = yield OfficersModel_1.default.findAll();
                }
                else if (hasAccessToBranchOfficers) {
                    officers = yield OfficersModel_1.default.findAll({
                        where: {
                            branches_id: req.user.officer.branches_id,
                        },
                    });
                }
                else {
                    officers = [];
                }
                //   console.log({
                //     premissions: JSON.stringify(req.user.userType.premissions),
                //     officers: JSON.stringify(officers),
                //     hasAccessToBranchOfficers,
                //   });
                return officers;
            });
            const getAllOptions = () => {
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
            };
            let options = yield getAllOptions();
            res.json(options);
        });
    }
}
exports.default = WaredOptionsController;
