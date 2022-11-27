import { Request, Response } from "express";
import Wared from '../../../models/WaredModel'
import Officer from "../../../models/OfficersModel";
import Branches from "../../../models/BranchesModel";
import Gehaa from "../../../models/GehaaModel";
import Wared_Branches from "../../../models/Wared_BranchesModel";
import Wared_Officers from "../../../models/Wared_OfficersModel";
import sequelize from "../../../db";
import { Op } from "sequelize";

class CreateWaredRepo {
  public static async store(
    reqBodyData: any,
    fileLocationPath: string
  ): Promise<any> {
    // console.log({ reqBodyData });

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
        let branchesIdsArr = selectedBranchs.map((branch: any) => {
          return branch.value;
        });
        let lastWared = await Wared.findOne({
          where: {
            doc_num: reqBodyData.lastWaredNum,
          },
        }).catch((err: any) => {
          return null;
        });
        let lastWared_id = lastWared?.getDataValue("id");
        let storedWared = await Wared.create({
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
          attach: fileLocationPath,
        });
        let wared_branches_rows = branchesIdsObjs.map(
          (brancheIdObj: { id: any }) => {
            return {
              wared_id: storedWared.getDataValue("id"),
              branches_id: brancheIdObj.id,
            };
          }
        );
        let wared_officers_rows = officersIdsObjs.map(
          (officerIdObj: { id: any }) => {
            return {
              wared_id: storedWared.getDataValue("id"),
              officers_id: officerIdObj.id,
            };
          }
        );
        // console.log({ wared_branches_rows, wared_officers_rows });
        // let stored_wared_officers_rows = branchesIdsObjs.map();
        let stored_wared_branches = await Wared_Branches.bulkCreate(
          wared_branches_rows
        );
        let stored_wared_officers = await Wared_Officers.bulkCreate(
          wared_officers_rows
        );
        let selectedBranchesManagers = await Branches.findAll({
          where: {
            id: {
              [Op.in]: branchesIdsArr,
            },
          },
        });

        await t.commit();
        resolve();
      } catch (error) {
        // console.log(error)
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await t.rollback();
        reject(error);
      }
    });
  }
}

export default CreateWaredRepo;
