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
const SaderBoxRepo_1 = __importDefault(require("../repos/SaderBoxRepo"));
class SaderBoxController {
    static getSearchOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SaderBoxRepo_1.default.getSearchOptions();
                // console.log({result});
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static getSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = req.query;
            // console.log({params})
            try {
                let result = yield SaderBoxRepo_1.default.getWithParams(params, req);
                // console.log({result});
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
}
exports.default = SaderBoxController;
