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
const EditWaredRepo_1 = __importDefault(require("../repos/EditWaredRepo"));
class EditWaredController {
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
                yield EditWaredRepo_1.default.update(req.body, filePathToStore);
                (0, socketIo_1.default)(types_1.socketIoEvent.refetchWared);
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
exports.default = EditWaredController;
