"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premissions = exports.socketIoEvent = void 0;
var socketIoEvent;
(function (socketIoEvent) {
    socketIoEvent["refetchWared"] = "refetchWared";
    socketIoEvent["refetchSader"] = "refetchSader";
})(socketIoEvent = exports.socketIoEvent || (exports.socketIoEvent = {}));
var premissions;
(function (premissions) {
    premissions["addSader"] = "add sader";
    premissions["addWared"] = "add wared";
    premissions["deleteSader"] = "delete sader";
    premissions["deleteWared"] = "delete wared";
    premissions["editSader"] = "edit sader";
    premissions["editWared"] = "edit wared";
    premissions["editWaredBranchs"] = "edit wared branches";
    premissions["editWaredOfficers"] = "edit wared officers";
    premissions["hasAccessToAllBranches"] = "has access to all branches";
    premissions["hasAccessToAllOfficers"] = "has access to all officers";
    premissions["hasAccessToAllSader"] = "has access to all sader";
    premissions["hasAccessToAllWared"] = "has access to all wared";
    premissions["hasAccessToBranchOfficers"] = "has access to branch officers";
    premissions["hasAccessToBranchSader"] = "has access to branch sader";
    premissions["hasAccessToBranchWared"] = "has access to branch wared";
})(premissions = exports.premissions || (exports.premissions = {}));
// export interface {}
