import Arms from "../ArmsModel"; 
import Branches from "../BranchesModel";
import Gehaa from "../GehaaModel";
import Officer from "../OfficersModel";
import Ranks from "../RanksMode";
import Sader_Gehaa from "../Sader_GehaaModel";
import Sader from "../SaderModel";
import Sadertrackingofficers from "../SadertrackingofficersModel";
import Wared from "../WaredModel";
import Wared_Branches from "../Wared_BranchesModel";
import Wared_Officers from "../Wared_OfficersModel";
import WaredTrackingOfficers from "../WaredTrackingOfficersModel";
import UserType from "../UserTypes";
import User from "../User";
import Premission from "../Premissions";
import UserType_premission from "../UserType_premissionModel";
import Config from "../ConfigModel";
// wared relations
Wared.belongsTo(Gehaa, {
  foreignKey: "gehaa_id",
  //constraints: false,
});

Wared.belongsToMany(Branches, {
  through: Wared_Branches,
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "branches_id",
  onDelete: "CASCADE",
  //constraints: false,
});
Wared.belongsToMany(Officer, {
  through: Wared_Officers,
  as: "Wared_Officers",
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "officers_id",
  onDelete: "CASCADE",
  //constraints: false,
});

Wared.belongsToMany(Officer, {
  through: WaredTrackingOfficers,
  as: "WaredTrackingOfficers",
  foreignKey: "wared_id", // replaces `productId`
  otherKey: "officer_id",
  onDelete: "CASCADE",
  //constraints: false,
});

Wared.belongsTo(Sader, {
  foreignKey: "closedSader_id",
  as:'waredClosedSader'
});

// Wared.belongsTo(Sader,{
//   foreignKey: "closedSader_id",
//   as:'waredClosedSader'
// })

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
  as:'lastWared'
  //constraints: false,
});

Sader.hasMany(Wared, {
  foreignKey: "closedSader_id",
  as:'waredClosedSader'
});
Sader.belongsTo(Officer, {
  foreignKey: "officer_id",
  as: "SaderOfficer",
  //constraints: false,
});
Sader.belongsTo(Branches, {
  foreignKey: "branch_id",
});
Sader.belongsToMany(Officer, {
  through: Sadertrackingofficers,
  as: "Sadertrackingofficers",

  foreignKey: "sader_id",
  otherKey: "officer_id",
  onDelete: "CASCADE",

  //constraints: false,
});
Sader.belongsToMany(Gehaa, {
  through: Sader_Gehaa,
  foreignKey: "sader_id",
  otherKey: "gehaa_id",
  // onDelete: "CASCADE",

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

User.belongsTo(UserType, {
  foreignKey: "userTypeId",
  //constraints: false,
});

User.belongsTo(Officer, {
  foreignKey: "officerId",
  //constraints: false,
});

UserType.belongsToMany(Premission, {
  through: UserType_premission,
  foreignKey: "userTypeId",
  otherKey: "premissionId",
  constraints: false,
});

//------------------------------------------------------------

Officer.belongsTo(Branches, {
  foreignKey: "branches_id",
  //constraints: false,
});

Officer.belongsTo(Arms, {
  foreignKey: "arms_id",
  //constraints: false,
});

Officer.belongsTo(Ranks, {
  foreignKey: "Ranks_id",
  //constraints: false,
});
