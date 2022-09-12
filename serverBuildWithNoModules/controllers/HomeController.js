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
const HomeRepo_1 = __importDefault(require("../repos/HomeRepo"));
class HomeController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log({ filePath: req.file?.path });
                let data = yield HomeRepo_1.default.index(req);
                res.json(data);
            }
            catch (error) {
                console.log(error, { msg: "faild to fetch" });
                // res.status(500);
                res.status(400).json("wrong password please try again");
            }
        });
    }
}
exports.default = HomeController;
