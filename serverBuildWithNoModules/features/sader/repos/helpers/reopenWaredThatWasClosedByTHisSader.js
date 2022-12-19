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
const WaredModel_1 = __importDefault(require("../../../../models/WaredModel"));
function reopenWaredThatWasClosedByTHisSader(saderId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield WaredModel_1.default.update({ known: 0, closedSader_id: null }, { where: { known: 1, closedSader_id: saderId } });
    });
}
exports.default = reopenWaredThatWasClosedByTHisSader;
