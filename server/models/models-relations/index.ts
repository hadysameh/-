import Arms from "../ArmsModel";
import Auth_Group from "../OldAuthModels/Auth_GroupModel";
import Auth_Permission from "../OldAuthModels/Auth_PermissionModel";
import Auth_User_Groups from "../OldAuthModels/Auth_User_GroupsModel";
import Auth_User_User_Permissions from "../OldAuthModels/Auth_User_User_PermissionsModel";
import Auth_User from "../OldAuthModels/Auth_User";
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
import UserType from "../NewAuthModels/UserTypes";
import User from "../NewAuthModels/User";
import Premission from '../NewAuthModels/Premissions'
import UserType_premission from '../UserType_premissionModel'
import Config from '../ConfigModel'
// wared relations
Wared.belongsTo(Gehaa, {
  foreignKey: "gehaa_id",
});
Wared.belongsTo(Sader, {
  foreignKey: "lastSader_id",
});
Wared.belongsTo(Sader, {
  foreignKey: "closedSader_id",
  onDelete: "CASCADE",
});
Wared.belongsToMany(Branches, {
  through: Wared_Branches,
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "branches_id",
  onDelete: "CASCADE",
});
// Branches.belongsToMany(Wared, { through: Wared_Branches });
Wared.belongsToMany(Officers, {
  through: Wared_Officers,
  as: "Wared_Officers",
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "officers_id",
  onDelete: "CASCADE",
});

Wared.belongsToMany(Officers, {
  through: WaredTrackingOfficers,
  as: "WaredTrackingOfficers",
  foreignKey: "wared_id", // replaces `productId`
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

Sader.belongsTo(Wared, {
  foreignKey: "lastWared_id",
});
Sader.belongsTo(Officers, {
  foreignKey: "officer_id",
  as: "SaderOfficer",
});
Sader.belongsTo(Branches, {
  foreignKey: "branch_id",
});
Sader.belongsToMany(Officers, {
  through: Sadertrackingofficers,
  as: "Sadertrackingofficers",

  foreignKey: "sader_id",  
  otherKey: "officer_id",
});
Sader.belongsToMany(Gehaa, {
  through: Sader_Gehaa,
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

User.belongsTo(UserType,{
  foreignKey: "userTypeId",
});

User.belongsTo(Officers,{
  foreignKey: "officerId",
});

UserType.belongsToMany(Premission,{
  through:UserType_premission,
  foreignKey: "userTypeId", 
  otherKey: "premissionId",
})

//------------------------------------------------------------


Officers.belongsTo(Branches,{
  foreignKey: "branches_id",
})

Officers.belongsTo(Arms,{
  foreignKey: "arms_id",
})

Officers.belongsTo(Ranks,{
  foreignKey: "Ranks_id",
})