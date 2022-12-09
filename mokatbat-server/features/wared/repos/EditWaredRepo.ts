import { Request, Response } from "express";
import Wared from '../../../models/WaredModel' 
import Branches from "../../../models/BranchesModel"; 
import Wared_Branches from "../../../models/Wared_BranchesModel";
import Wared_Officers from "../../../models/Wared_OfficersModel";
import sequelize from "../../../db/seqeulize";
import { Op } from "sequelize";
import WaredTrackingOfficers from "../../../models/WaredTrackingOfficersModel";
// import dateFormat from 'date-format'

class EditWaredRepo {
  public static async update(
    reqBodyData: any,
    fileLocationPath: string | null = null
  ) {
    return new Promise(async (resolve: any, reject: any) => {
      const t = await sequelize.transaction();

      try {
        let selectedBranchs = JSON.parse(reqBodyData.selectedBranchs);
        let selectedOfficers = JSON.parse(reqBodyData.selectedOfficers);
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
        // console.log({ officersIdsObjs });
        let branchesIdsArr = selectedBranchs.map((branch: any) => {
          return branch.value;
        });
        let lastWared = await Wared.findOne({
          where: {
            doc_num: reqBodyData.lastWaredNumber,
            gehaa_id: reqBodyData.lastWaredGeha_id,
            year:reqBodyData.lastWaredYear,
          },
        }).catch((err: any) => {
          return null;
        });
        let lastWared_id = lastWared?.getDataValue("id");
        let modifiedWaredData: any = {
          doc_num: reqBodyData.doc_num,
          doc_dept_num: reqBodyData.doc_dept_num,
          doc_date: reqBodyData.doc_date,
          subject: reqBodyData.subject,
          docDeadline:
            reqBodyData.hasDeadLine == "true" ? reqBodyData.docDeadline : null,
          gehaa_id: reqBodyData.gehaa_id,
          known: reqBodyData.docDeadline ? "0" : "1",
          deliver_date: reqBodyData.deliver_date,
          lastWared_id,
          type: reqBodyData.type,
          register_user: "1",
        };
        if (fileLocationPath) {
          modifiedWaredData["attach"] = fileLocationPath;
        }
        let modifiedWared = await Wared.update(modifiedWaredData, {
          where: { id: reqBodyData["waredId"] },
        });

        let wared_branches_rows = branchesIdsObjs.map(
          (brancheIdObj: { id: any }) => {
            return {
              wared_id: reqBodyData["waredId"],
              branches_id: brancheIdObj.id,
            };
          }
        );
        let wared_officers_rows = officersIdsObjs.map(
          (officerIdObj: { id: any }) => {
            return {
              wared_id: reqBodyData["waredId"],
              officers_id: officerIdObj.id,
            };
          }
        );
        // console.log({ wared_branches_rows, wared_officers_rows });

        await Wared_Branches.destroy({
          where: {
            wared_id: reqBodyData["waredId"],
          },
        });
        await Wared_Officers.destroy({
          where: {
            wared_id: reqBodyData["waredId"],
          },
        });

        await Wared_Branches.bulkCreate(wared_branches_rows, {
          updateOnDuplicate: ["wared_id"],
        });
        await Wared_Officers.bulkCreate(wared_officers_rows, {
          updateOnDuplicate: ["wared_id"],
        });
        let selectedBranchesManagers = await Branches.findAll({
          where: {
            id: {
              [Op.in]: branchesIdsArr,
            },
          },
        });

        await WaredTrackingOfficers.destroy({
          where: {
            wared_id: reqBodyData["waredId"],
          },
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
export default EditWaredRepo;
