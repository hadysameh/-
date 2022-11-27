import { Request } from "express";
import { Op } from "sequelize";
import {
  isHasAccessToAllSader,
  isHasAccessToBranchWared,
} from "../../../helpers/premissionsHelpers";
import Branches from "../../branches/models/BranchesModel";
import Config from "../../config/models/ConfigModel";
import Officer from "../../officers/models/OfficersModel";
import Sader from "../models/SaderModel";

export default class NumberOfUnreadSaderController {
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

    let numberOfTotalReadSader = await Sader.count({
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
    const NumberOfUnreadSader =
      numberOfSaderAfterLaunchForOfficer - numberOfTotalReadSader;
    console.log({ NumberOfUnreadSader });
    return NumberOfUnreadSader;
  }
}
