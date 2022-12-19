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
const SaderModel_1 = __importDefault(require("../../../models/SaderModel"));
class DeleteSaderRepo {
    static delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let saderId = req.body.saderId;
                // console.log({ saderId: req.body.saderId });
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
exports.default = DeleteSaderRepo;
