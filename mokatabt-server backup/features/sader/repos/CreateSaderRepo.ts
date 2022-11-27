import sequelize from "../../../db";
import Branches from "../../branches/models/BranchesModel";
import { Wared } from "../../wared";
import { Sader } from "../../sader";
import getTodaysDate from "../../../helpers/getTodaysDate";
import { Sader_Gehaa } from "../../sader";
import closeOpenedWared from "./helpers/closeOpenWared";


export default class CreateSaderRepo {
  public static async store(
    reqBodyData: any,
    fileLocationPath: string
  ): Promise<any> {
    // console.log({ reqBodyData, fileLocationPath });
    return new Promise(async (resolve: any, reject: any) => {
      const t = await sequelize.transaction();
      try {
        // console.log({ selectedGehaat: reqBodyData.gehaat });
        let selectedGehaat = JSON.parse(reqBodyData.gehaat);

        let lastWared = await Wared.findOne({
          where: {
            doc_num: reqBodyData.closedWaredDocNum
              ? reqBodyData.closedWaredDocNum
              : "f",
          },
        }).catch((err: any) => {
          return null;
        });
        let lastWared_id = lastWared?.getDataValue("id");
        let assistantBranch = await Branches.findOne({
          where: {
            id: reqBodyData.branch_id,
          },
        }).catch((err) => {
          return null;
        });
        let assistantBranchId = assistantBranch?.getDataValue("id");
        let storedSader = await Sader.create({
          doc_num: reqBodyData.doc_num,
          doc_date: reqBodyData.doc_date,
          branch_id: reqBodyData.branch_id,
          subject: reqBodyData.subject,
          known: reqBodyData.branch_id,
          officer_id: reqBodyData.officer_id,
          lastWared_id: lastWared_id ? lastWared_id : null,
          register_date: getTodaysDate(),
          type: reqBodyData.type,
          register_user: "1",
          attach: fileLocationPath,
        });
        if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
          await closeOpenedWared(
            reqBodyData["selectedMokatbatWithDeadLineForSader"],
            storedSader.getDataValue("id")
          );
        }
        let gehaatIdsObjs: { id: any }[] = selectedGehaat.map((branch: any) => {
          return { id: branch.value };
        });
        let Sader_GehaaRows = gehaatIdsObjs.map((gehaaIdObj) => {
          return {
            sader_id: storedSader.getDataValue("id"),
            gehaa_id: gehaaIdObj.id,
          };
        });

        await Sader_Gehaa.bulkCreate(Sader_GehaaRows);

        t.commit();

        resolve();
      } catch (error) {
        t.rollback();
        reject(error);
      }
    });
  }
}
