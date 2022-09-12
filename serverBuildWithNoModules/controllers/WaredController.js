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
const WaredRepo_1 = __importDefault(require("../repos/WaredRepo"));
const socketIo_1 = __importDefault(require("../helpers/socketIo"));
class WaredController {
    static getNumberOfUnreadWared(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            try {
                let result = yield WaredRepo_1.default.getNumberOfUnreadWared(req);
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ reqParams: req.query });
            let id = req.query.id;
            try {
                let result = yield WaredRepo_1.default.getById(id);
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let numOfRecords = req.query.numOfRecords;
            let pageNum = req.query.pageNum;
            // console.log({req})
            try {
                let result = yield WaredRepo_1.default.get(pageNum, numOfRecords);
                // console.log({result});
                res.json(result);
            }
            catch (error) {
                console.log({ error });
            }
        });
    }
    static getSearchOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield WaredRepo_1.default.getSearchOptions();
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
            try {
                let result = yield WaredRepo_1.default.getWithParams(params, req);
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
            // console.log({file:req.file})
            let filePathToStore = req.file
                ? filePathInUploadsFolder + "/" + req.file.filename
                : "";
            try {
                yield WaredRepo_1.default.store(req.body, filePathToStore);
                (0, socketIo_1.default)("refetchWaredAndSaderUnreadNumbers");
                res.status(200).json({ msg: "ok" });
            }
            catch (error) {
                console.log(error, { msg: "faild to store" });
                // res.status(500);
                res.status(500).json({ error });
            }
        });
    }
    static update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ body: req.body });
            // console.log({file:req.file})
            let filePathToStore = null;
            if (req.file) {
                let filePathInUploadsFolder = (_a = req.file) === null || _a === void 0 ? void 0 : _a.destination.replace("./uploads/", "");
                filePathToStore = req.file
                    ? filePathInUploadsFolder + "/" + req.file.filename
                    : "";
            }
            try {
                // console.log({ filePath: req.file?.path });
                yield WaredRepo_1.default.update(req.body, filePathToStore);
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
                yield WaredRepo_1.default.deleteWared(req)
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
    static updateOfficersAndBranches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            WaredRepo_1.default.updateOfficersAndBranches(req);
            try {
                // console.log({ filePath: req.file?.path });
                yield WaredRepo_1.default.updateOfficersAndBranches(req);
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
exports.default = WaredController;
