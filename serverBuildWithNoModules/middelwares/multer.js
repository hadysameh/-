"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saderUpload = exports.waredUpload = void 0;
// const multer  = require('multer')
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const getCurrentYear_1 = __importDefault(require("../utils/getCurrentYear"));
function waredDestination(req, file, cb) {
    let folderPath = "./uploads/waredPdf/" + (0, getCurrentYear_1.default)();
    let isFolderExist = fs_1.default.existsSync(folderPath);
    if (isFolderExist) {
        cb(null, folderPath);
    }
    else {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
}
function saderDestination(req, file, cb) {
    let folderPath = "./uploads/saderPdf/" + (0, getCurrentYear_1.default)();
    let isFolderExist = fs_1.default.existsSync(folderPath);
    if (isFolderExist) {
        cb(null, folderPath);
    }
    else {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
}
const waredStorage = multer_1.default.diskStorage({
    destination: waredDestination,
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});
const saderStorage = multer_1.default.diskStorage({
    destination: saderDestination,
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});
const waredUpload = (0, multer_1.default)({
    /* dest: '/uploads/',*/ storage: waredStorage,
});
exports.waredUpload = waredUpload;
const saderUpload = (0, multer_1.default)({
    /* dest: '/uploads/',*/ storage: saderStorage,
});
exports.saderUpload = saderUpload;
