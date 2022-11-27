import { Request } from "express";
import { Op } from "sequelize";
import {
  isHasAccessToAllSader,
  isHasAccessToBranchWared,
} from "../../../helpers/premissionsHelpers";
import Branches from "../../../models/BranchesModel";
import Config from "../../../models/ConfigModel";
import Officer from "../../../models/OfficersModel";
import Sader from "../../../models/SaderModel";

export default class NumberOfUnreadSaderRepo {
  public static async getNumberOfUnreadSader(req: Request) {
    let saderIncludeParams = [];

    let config = await Config.findOne();
    const hasAccessToAllSader = isHasAccessToAllSader(req);

    const hasAccessToBranchWared = isHasAccessToBranchWared(req);

    if (!hasAccessToAllSader) {
      if (hasAccessToBranchWared) {
        saderIncludeParams.push({
          model: Branches,
          where: { id: req.user.officer.branches_id },
        });
      } else {
        saderIncludeParams.push({
          model: Officer,
          as: "SaderOfficer",
          where: { id: req.user.officerId },
        });
      }
    }

    let numberOfSaderAfterLaunchForOfficer = await Sader.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [...saderIncludeParams],
    });

    let numberOfreadSader = await Sader.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [
        ...saderIncludeParams,
        {
          model: Officer,
          where: { id: { [Op.eq]: req.user.officerId } },
          as: "Sadertrackingofficers",
        },
      ],
    });
    return numberOfSaderAfterLaunchForOfficer - numberOfreadSader;
  }
}
