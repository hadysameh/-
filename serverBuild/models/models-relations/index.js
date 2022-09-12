"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArmsModel_1 = __importDefault(require("../ArmsModel"));
const BranchesModel_1 = __importDefault(require("../BranchesModel"));
const GehaaModel_1 = __importDefault(require("../GehaaModel"));
const OfficersModel_1 = __importDefault(require("../OfficersModel"));
const RanksMode_1 = __importDefault(require("../RanksMode"));
const Sader_GehaaModel_1 = __importDefault(require("../Sader_GehaaModel"));
const SaderModel_1 = __importDefault(require("../SaderModel"));
const SadertrackingofficersModel_1 = __importDefault(require("../SadertrackingofficersModel"));
const WaredModel_1 = __importDefault(require("../WaredModel"));
const Wared_BranchesModel_1 = __importDefault(require("../Wared_BranchesModel"));
const Wared_OfficersModel_1 = __importDefault(require("../Wared_OfficersModel"));
const WaredTrackingOfficersModel_1 = __importDefault(require("../WaredTrackingOfficersModel"));
const UserTypes_1 = __importDefault(require("../NewAuthModels/UserTypes"));
const User_1 = __importDefault(require("../NewAuthModels/User"));
const Premissions_1 = __importDefault(require("../NewAuthModels/Premissions"));
const UserType_premissionModel_1 = __importDefault(require("../UserType_premissionModel"));
// wared relations
WaredModel_1.default.belongsTo(GehaaModel_1.default, {
    foreignKey: "gehaa_id",
});
WaredModel_1.default.belongsTo(SaderModel_1.default, {
    foreignKey: "lastSader_id",
});
WaredModel_1.default.belongsTo(SaderModel_1.default, {
    foreignKey: "closedSader_id",
    onDelete: "CASCADE",
});
WaredModel_1.default.belongsToMany(BranchesModel_1.default, {
    through: Wared_BranchesModel_1.default,
    foreignKey: "wared_id",
    otherKey: "branches_id",
    onDelete: "CASCADE",
});
// Branches.belongsToMany(Wared, { through: Wared_Branches });
WaredModel_1.default.belongsToMany(OfficersModel_1.default, {
    through: Wared_OfficersModel_1.default,
    as: "Wared_Officers",
    foreignKey: "wared_id",
    otherKey: "officers_id",
    onDelete: "CASCADE",
});
WaredModel_1.default.belongsToMany(OfficersModel_1.default, {
    through: WaredTrackingOfficersModel_1.default,
    as: "WaredTrackingOfficers",
    foreignKey: "wared_id",
    otherKey: "officer_id",
    onDelete: "CASCADE",
});
// WaredTrackingOfficers.belongsTo(Wared, {
//   foreignKey: "wared_id",
//   onDelete: "CASCADE",
//   as:'Wared_WaredTrackingOfficers'
// });
// WaredTrackingOfficers.belongsTo(Officers, {
//   foreignKey: "officer_id",
//   onDelete: "CASCADE",
//   as:'Officers_WaredTrackingOfficers'
// });
//------------------------------------------------------------
SaderModel_1.default.belongsTo(WaredModel_1.default, {
    foreignKey: "lastWared_id",
});
SaderModel_1.default.belongsTo(OfficersModel_1.default, {
    foreignKey: "officer_id",
    as: "SaderOfficer",
});
SaderModel_1.default.belongsTo(BranchesModel_1.default, {
    foreignKey: "branch_id",
});
SaderModel_1.default.belongsToMany(OfficersModel_1.default, {
    through: SadertrackingofficersModel_1.default,
    as: "Sadertrackingofficers",
    foreignKey: "sader_id",
    otherKey: "officer_id",
});
SaderModel_1.default.belongsToMany(GehaaModel_1.default, {
    through: Sader_GehaaModel_1.default,
    foreignKey: "sader_id",
    otherKey: "gehaa_id",
    constraints: false,
});
// Sadertrackingofficers.belongsTo(Sader, {
//   foreignKey: "sader_id",
//   onDelete: "CASCADE",
// });
// Sadertrackingofficers.belongsTo(Officers, {
//   foreignKey: "officer_id",
//   onDelete: "CASCADE",
// });
//------------------------------------------------------------
User_1.default.belongsTo(UserTypes_1.default, {
    foreignKey: "userTypeId",
    constraints: false,
});
User_1.default.belongsTo(OfficersModel_1.default, {
    foreignKey: "officerId",
    constraints: false,
});
UserTypes_1.default.belongsToMany(Premissions_1.default, {
    through: UserType_premissionModel_1.default,
    foreignKey: "userTypeId",
    otherKey: "premissionId",
    constraints: false,
});
//------------------------------------------------------------
OfficersModel_1.default.belongsTo(BranchesModel_1.default, {
    foreignKey: "branches_id",
});
OfficersModel_1.default.belongsTo(ArmsModel_1.default, {
    foreignKey: "arms_id",
});
OfficersModel_1.default.belongsTo(RanksMode_1.default, {
    foreignKey: "Ranks_id",
});
