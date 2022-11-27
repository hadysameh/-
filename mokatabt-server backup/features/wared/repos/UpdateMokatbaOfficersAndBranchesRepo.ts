import { Request } from "express";
import Wared from "../models/WaredModel";
import { Officer } from "../../officers";
import { Branches } from "../../branches";
import { Gehaa } from "../../gehaa";
import Wared_Branches from "../models/Wared_BranchesModel";
import Wared_Officers from "../models/Wared_OfficersModel";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import sequelize from "../../../db"; 
class UpdateMokatbaOfficersAndBranchesRepo {
  public static async updateOfficersAndBranches(req: Request) {
    return new Promise(async (resolve: any, reject: any) => {
      const t = await sequelize.transaction();

      try {
        req.body.selectedBranchs;
        // console.log({ body: req.body });

        const waredId = req.body["waredId"];
        let selectedBranchs = JSON.parse(req.body.selectedBranchs);
        let selectedOfficers = JSON.parse(req.body.selectedOfficers);
        let branchesIdsObjs: { id: any }[] = selectedBranchs.map(
          (branch: any) => {
            return { id: branch.value };
          }
        );

        let officersIdsObjs: { id: any }[] = selectedOfficers.map(
          (selectedOfficer: any) => {
            return { id: selectedOfficer.value };
          }
        );
        // await Wared.update(c,{ where: { id: reqBodyData["waredId"] }})
        await Wared_Branches.destroy({
          where: {
            wared_id: waredId,
          },
        });
        await Wared_Officers.destroy({
          where: {
            wared_id: waredId,
          },
        });

        let wared_branchesRows = branchesIdsObjs.map(
          (brancheIdObj: { id: any }) => {
            return {
              wared_id: waredId,
              branches_id: brancheIdObj.id,
            };
          }
        );
        let wared_officersRows = officersIdsObjs.map(
          (officerIdObj: { id: any }) => {
            return {
              wared_id: waredId,
              officers_id: officerIdObj.id,
            };
          }
        );

        // console.log({ wared_branchesRows, wared_officersRows });
        await Wared_Branches.bulkCreate(wared_branchesRows, {
          updateOnDuplicate: ["wared_id"],
        });
        await Wared_Officers.bulkCreate(wared_officersRows, {
          updateOnDuplicate: ["wared_id"],
        });
        await t.commit();
        resolve();
      } catch (error) {
        console.log(error);
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await t.rollback();
        reject("");
      }
    });
  }
}

export default UpdateMokatbaOfficersAndBranchesRepo;
