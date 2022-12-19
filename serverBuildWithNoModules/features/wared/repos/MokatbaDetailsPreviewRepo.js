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
const OfficersModel_1 = __importDefault(require("../../../models/OfficersModel"));
const BranchesModel_1 = __importDefault(require("../../../models/BranchesModel"));
const GehaaModel_1 = __importDefault(require("../../../models/GehaaModel"));
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
class MokatbaDetailsPreviewRepo {
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
                    {
                        model: SaderModel_1.default,
                        as: 'waredClosedSader'
                    },
                    {
                        model: WaredModel_1.default,
                        as: 'lastWared'
                    }
                ],
            });
            return mokatba;
        });
    }
}
exports.default = MokatbaDetailsPreviewRepo;
