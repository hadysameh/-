import Config from "../models/ConfigModel";
import { Request, Response } from "express";
import Gehaa from "../models/GehaaModel";
import Branches from "../models/BranchesModel";
import Officers from "../models/OfficersModel";

export default class WaredOptionsController {
  static async get(req: Request, res: Response) {
    const getGehaat = async () => {
      let gehaat = await Gehaa.findAll();
      return gehaat;
    };

    const getBranches = async () => {
      let branches: any[];

      const hasAccessToAllBranches =
        req.user.userType.premissions.includes("has access to all branches") ||
        req.user.userType.type === "admin";

      if (hasAccessToAllBranches) {
        branches = await Branches.findAll();
      } else {
        branches = [];
      }

      return branches;
    };

    const getOfficers = async () => {
      let officers: any[];

      const hasAccessToAllOfficers =
        req.user.userType.premissions.find((premission: any) => {
          return premission.premission === "has access to all officers";
        }) || req.user.userType.type === "admin";

      const hasAccessToBranchOfficers = req.user.userType.premissions.find(
        (premission: any) => {
          return premission.premission === "has access to branch officers";
        }
      );
      if (hasAccessToAllOfficers) {
        officers = await Officers.findAll();
      } else if (hasAccessToBranchOfficers) {
        officers = await Officers.findAll({
          where: {
            branches_id: req.user.officer.branches_id,
          },
        });
      } else {
        officers = [];
      }
      //   console.log({
      //     premissions: JSON.stringify(req.user.userType.premissions),
      //     officers: JSON.stringify(officers),
      //     hasAccessToBranchOfficers,
      //   });

      return officers;
    };
    const getDaysBeforeExecution = async () => {
      let config = await Config.findOne({
        where: {
          id: 1,
        },
      });
      return config?.getDataValue("dateOfLaunch");
    };
    const getAllOptions = (): Promise<any> => {
      return new Promise((resolve: any, reject: any) => {
        Promise.all([
          getGehaat(),
          getBranches(),
          getOfficers(),
          getDaysBeforeExecution(),
        ])
          .then((values) => {
            let result = {
              gehaat: values[0],
              branches: values[1],
              officers: values[2],
              daysBeforeExecution: values[3],
            };
            // console.log({result})
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    let options = await getAllOptions();

    res.json(options);
  }
}
