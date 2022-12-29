import { Request, Response } from "express";
import Wared from "../../../models/WaredModel";
import Officer from "../../../models/OfficersModel";
import Branches from "../../../models/BranchesModel";
import Config from "../../../models/ConfigModel";
import { Op } from "sequelize";
import {
  isHasAccessToAllWared,
  isHasAccessToBranchWared,
} from "../../../helpers/premissionsHelpers";

class NumberOfUnreadWaredRepo {
  public static async getNumberOfUnreadWared(req: Request) {
    let waredIncludeParams = [];

    let config = await Config.findOne({
      where: {
        id: 1,
      },
    });
    const hasAccessToAllWared = isHasAccessToAllWared(req);

    const hasAccessToBranchWared = isHasAccessToBranchWared(req);

    if (!hasAccessToAllWared) {
      if (hasAccessToBranchWared) {
        waredIncludeParams.push({
          model: Branches,
          where: { id: req.user.officer.branches_id },
        });
      } else {
        waredIncludeParams.push({
          model: Officer,
          as: "Wared_Officers",
          where: { id: req.user.officerId },
        });
      }
    }

    let numberOfWaredAfterLaunchForOfficer = await Wared.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [...waredIncludeParams],
    });

    let numberOfreadWared = await Wared.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [
        ...waredIncludeParams,
        {
          model: Officer,
          where: { id: { [Op.eq]: req.user.officerId } },
          as: "WaredTrackingOfficers",
        },
      ],
    });
    const numberOfUnreadWared =
      numberOfWaredAfterLaunchForOfficer - numberOfreadWared;
    
    return numberOfUnreadWared;
  }
}
export default NumberOfUnreadWaredRepo;
