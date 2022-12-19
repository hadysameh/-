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
const GehaaModel_1 = __importDefault(require("../../../models/GehaaModel"));
const WaredModel_1 = __importDefault(require("../../../models/WaredModel"));
class WaredWithDeadLineRepo {
    static getAllWaredWithDeadLine(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let whereParams = {};
            let orderByArr = [];
            whereParams["closedSader_id"] = null;
            whereParams["known"] = 0;
            let wareds = yield WaredModel_1.default.findAll({
                where: whereParams,
                order: [["deadline", "ASC"]],
                include: [GehaaModel_1.default],
            });
            return wareds;
        });
    }
}
exports.default = WaredWithDeadLineRepo;
