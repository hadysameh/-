import Wared from "../models/WaredModel";
import Sader from "../models/SaderModel";
import { Op } from "sequelize";
import getTodaysDate from "../utils/getTodaysDate";
import getCurrentYear from "../utils/getCurrentYear";
import addDaysToDate from "../utils/addDaysToDate";
import { Request } from "express";
import Branches from "../models/BranchesModel";
import Officers from "../models/OfficersModel";

const daysBeforeExec = 7;

class HomeRepo {
  static async index(req: Request) {
    return new Promise(async (resolve: any, reject: any) => {
      const hasAccessToAllWared =
        req.user.usertype.premissions.find((premission: any) => {
          return premission.premission === "has access to all wared";
        }) || req.user.usertype.type === "admin";

      const hasAccessToBranchWared = req.user.usertype.premissions.find(
        (premission: any) => {
          return premission.premission === "has access to branch wared";
        }
      );
      let waredIncludeParams: any = [];
      let saderIncludeParams: any = [];

      if (!hasAccessToAllWared) {
        if (hasAccessToBranchWared) {
          waredIncludeParams.push({
            model: Branches,
            where: { id: req.user.officer.branches_id },
          });

          saderIncludeParams.push({
            model: Branches,
            where: { id: req.user.officer.branches_id },
          });
        } else {
          waredIncludeParams.push({
            model: Officers,
            as: "Wared_Officers",
            where: { id: req.user.officerId },
          });
          saderIncludeParams.push({
            model: Officers,
            as: "SaderOfficer",
            where: { id: req.user.officerId },
          });
        }
      }
      let waredCount = await Wared.count({ include: waredIncludeParams });
      let saderCount = await Sader.count({ include: saderIncludeParams });

      let redCircleCount = await Wared.count({
        include: waredIncludeParams,
        where: [
          {
            docDeadline: {
              [Op.lte]: `${addDaysToDate(getTodaysDate(), daysBeforeExec)}`,
            },
            closedSader_id: null,
            known: 0,
          },
        ],
      });

      let greenCircleCount = await Wared.count({
        include: waredIncludeParams,

        where: [
          {
            docDeadline: {
              // $gt: new Date(),
              [Op.gt]: `${addDaysToDate(getTodaysDate(), daysBeforeExec)}`,
            },
            closedSader_id: null,
            known: 0,
          },
        ],
      });
      resolve({
        waredCount,
        saderCount,
        redCircleCount,
        greenCircleCount,
      });
    });
  }
}
export default HomeRepo;
