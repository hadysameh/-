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
const socketIo_1 = __importDefault(require("../helpers/socketIo"));
const SaderRepo_1 = __importDefault(require("../repos/SaderRepo"));
class SaderController {
    static getNumberOfUnreadSader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SaderRepo_1.default.getNumberOfUnreadSader(req);
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let saderId = req.query.id;
            // console.log({ saderId, req: req.query });
            let sader = yield SaderRepo_1.default.getById(saderId);
            res.json(sader);
        });
    }
    static getSearchOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SaderRepo_1.default.getSearchOptions();
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
                let result = yield SaderRepo_1.default.getWithParams(params, req);
                // console.log({result});
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static store(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let filePathInUploadsFolder = (_a = req.file) === null || _a === void 0 ? void 0 : _a.destination.replace("./uploads/", "");
            let filePathToStore = req.file
                ? filePathInUploadsFolder + "/" + req.file.filename
                : "";
            try {
                yield SaderRepo_1.default.store(req.body, filePathToStore);
                (0, socketIo_1.default)("refetchWaredAndSaderUnreadNumbers");
                res.status(200).json({ msg: "ok" });
            }
            catch (error) {
                console.log(error, { msg: "faild to store" });
                // res.status(500);
                res.status(500).json("wrong password please try again");
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SaderRepo_1.default.delete(req)
                    .then((msg) => {
                    (0, socketIo_1.default)("refetchWaredAndSaderUnreadNumbers");
                    res.status(200).json(msg);
                })
                    .catch((msg) => {
                    res.status(400).json(msg);
                });
            }
            catch (error) { }
        });
    }
    static update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let filePathToStore = null;
            if (req.file) {
                let filePathInUploadsFolder = (_a = req.file) === null || _a === void 0 ? void 0 : _a.destination.replace("./uploads/", "");
                filePathToStore = req.file
                    ? filePathInUploadsFolder + "/" + req.file.filename
                    : "";
            }
            // console.log(req.body);
            try {
                yield SaderRepo_1.default.update(req.body, filePathToStore);
                (0, socketIo_1.default)("refetchWaredAndSaderUnreadNumbers");
                res.status(200).json({ msg: "ok" });
            }
            catch (error) {
                console.log(error, { msg: "faild to store" });
                // res.status(500);
                res.status(500).json("wrong password please try again");
            }
        });
    }
}
exports.default = SaderController;
