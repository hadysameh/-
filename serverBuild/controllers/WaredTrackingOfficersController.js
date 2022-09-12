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
const WaredTrackingOfficersModel_1 = __importDefault(require("../models/WaredTrackingOfficersModel"));
const socketIo_1 = __importDefault(require("../helpers/socketIo"));
class WaredTrackingOfficersController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let officerId = req.user.officerId;
            let waredId = req.body.waredId;
            try {
                const [waredTrackingOfficersRow, created] = yield WaredTrackingOfficersModel_1.default.upsert({
                    officer_id: officerId,
                    wared_id: waredId,
                });
                (0, socketIo_1.default)("refetchWaredAndSaderUnreadNumbersNoSound");
                res.status(200).json({});
            }
            catch (error) { }
        });
    }
}
exports.default = WaredTrackingOfficersController;
