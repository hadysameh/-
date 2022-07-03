import Arms from "../ArmsModel";
import Auth_Group from "../Auth_GroupModel";
import Auth_Permission from "../Auth_PermissionModel";
import Auth_User_Groups from "../Auth_User_GroupsModel";
import Auth_User_User_Permissions from "../Auth_User_User_PermissionsModel";
import Auth_User from "../Auth_User";
import Branches from "../BranchesModel";
import Gehaa from "../GehaaModel";
import Officers from "../OfficersModel";
import Ranks from "../RanksMode";
import Sader_Gehaa from "../Sader_GehaaModel";
import Sader from "../SaderModel";
import Sadertrackingofficers from "../SadertrackingofficersModel";
import Wared from "../WaredModel";
import Wared_Branches from "../Wared_BranchesModel";
import Wared_Officers from "../Wared_OfficersModel";
import WaredTrackingOfficers from "../WaredTrackingOfficersModel";
// wared relations
Wared.belongsTo(Gehaa, {
  foreignKey: "gehaa_id",
});
Wared.belongsTo(Sader, {
  foreignKey: "lastSader_id",
});
Wared.belongsTo(Sader, {
  foreignKey: "closedSader_id",
});
Wared.belongsToMany(Branches, {
  through: Wared_Branches,
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "branches_id",
});
// Branches.belongsToMany(Wared, { through: Wared_Branches });
Wared.belongsToMany(Officers, {
  through: Wared_Officers,
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "officers_id",
});
// Officers.belongsToMany(Wared, { through: Wared_Officers });