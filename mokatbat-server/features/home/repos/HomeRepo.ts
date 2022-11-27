import Wared from "../../../models/WaredModel";
import Sader from "../../../models/SaderModel";
import { Op } from "sequelize";
import getTodaysDate from "../../../helpers/getTodaysDate";
import getCurrentYear from "../../../helpers/getCurrentYear";
import addDaysToDate from "../../../helpers/addDaysToDate";
import { Request } from "express";
import Branches from "../../../models/BranchesModel";
import Officer from "../../../models/OfficersModel";
import Config from "../../../models/ConfigModel";

class HomeRepo {
  private static async getDaysBeforeExec() {
    let config = await Config.findOne({
      where: {
        id: 1,
      },
    });
    return config?.getDataValue("daysBeforeExecution");
  }
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
            model: Officer,
            as: "Wared_Officers",
            where: { id: req.user.officerId },
          });
          saderIncludeParams.push({
            model: Officer,
            as: "SaderOfficer",
            where: { id: req.user.officerId },
          });
        }
      }
      let waredCount = await Wared.count({ include: waredIncludeParams });
      let saderCount = await Sader.count({ include: saderIncludeParams });
      let daysBeforeExec = await this.getDaysBeforeExec();
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
