"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHasAccessToBranchWared = exports.isHasAccessToBranchSader = exports.isHasAccessToAllSader = exports.isHasAccessToAllWared = void 0;
const types_1 = require("../types");
const isHasAccessToAllWared = (req) => {
    return (req.user.usertype.premissions.find((premission) => {
        return premission.premission === types_1.premissions.hasAccessToAllWared;
    }) || req.user.usertype.type === "admin");
};
exports.isHasAccessToAllWared = isHasAccessToAllWared;
const isHasAccessToAllSader = (req) => {
    return (req.user.usertype.premissions.find((premission) => {
        return premission.premission === types_1.premissions.hasAccessToAllSader;
    }) || req.user.usertype.type === "admin");
};
exports.isHasAccessToAllSader = isHasAccessToAllSader;
const isHasAccessToBranchSader = (req) => {
    return req.user.usertype.premissions.find((premission) => {
        return premission.premission === types_1.premissions.hasAccessToBranchSader;
    });
};
exports.isHasAccessToBranchSader = isHasAccessToBranchSader;
const isHasAccessToBranchWared = (req) => {
    return req.user.usertype.premissions.find((premission) => {
        return premission.premission === types_1.premissions.hasAccessToBranchWared;
    });
};
exports.isHasAccessToBranchWared = isHasAccessToBranchWared;
