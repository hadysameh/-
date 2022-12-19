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
const socketIo_1 = __importDefault(require("../../../helpers/socketIo"));
const types_1 = require("../../../types");
const DeleteWaredRepo_1 = __importDefault(require("../repos/DeleteWaredRepo"));
class DeleteWaredController {
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DeleteWaredRepo_1.default.deleteWared(req)
                    .then((msg) => {
                    (0, socketIo_1.default)(types_1.socketIoEvent.refetchWared);
                    res.status(200).json(msg);
                })
                    .catch((msg) => {
                    res.status(400).json(msg);
                });
            }
            catch (error) { }
        });
    }
}
exports.default = DeleteWaredController;
