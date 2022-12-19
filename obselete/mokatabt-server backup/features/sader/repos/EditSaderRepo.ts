import sequelize from "../../../db";
import Branches from "../../branches/models/BranchesModel";
import { Wared } from "../../wared";
import { Sader } from "../../sader";
import getTodaysDate from "../../../helpers/getTodaysDate";
import { Sader_Gehaa } from "../../sader";
import closeOpenedWared from "./helpers/closeOpenWared";
import reopenWaredThatWasClosedByTHisSader from "./helpers/reopenWaredThatWasClosedByTHisSader";
import { Sadertrackingofficers } from "../../sader";
export default class EditSaderRepo {
  public static async update(
    reqBodyData: any,
    fileLocationPath: string | null = null
  ) {
    return new Promise(async (resolve: any, reject: any) => {
      const t = await sequelize.transaction();
      try {
        // console.log({reqBodyData});
        let selectedGehaat = JSON.parse(reqBodyData.gehaat);

        let lastWared = await Wared.findOne({
          where: {
            doc_num: reqBodyData.closedWaredDocNum,
          },
        }).catch((err: any) => {
          return null;
        });
        let lastWared_id = lastWared ? lastWared.getDataValue("id") : null;
        let modifiedSaderData: any = {
          doc_num: reqBodyData.doc_num,
          doc_date: reqBodyData.doc_date,
          branch_id: reqBodyData.branch_id,
          subject: reqBodyData.subject,
          known: reqBodyData.branch_id,
          officer_id: reqBodyData.officer_id,
          lastWared_id,
          register_date: getTodaysDate(),
          type: reqBodyData.type,
          register_user: "1",
        };
        if (fileLocationPath) {
          modifiedSaderData["attach"] = fileLocationPath;
        }
        await Sader.update(modifiedSaderData, {
          where: { id: reqBodyData["saderId"] },
        });
        if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
          await reopenWaredThatWasClosedByTHisSader(reqBodyData["saderId"]);
          await closeOpenedWared(
            reqBodyData["selectedMokatbatWithDeadLineForSader"],
            reqBodyData["saderId"]
          );
        }
        await Sadertrackingofficers.destroy({
          where: {
            sader_id: reqBodyData["saderId"],
          },
        });
        let gehaatIdsObjs: { id: any }[] = selectedGehaat.map((branch: any) => {
          return { id: branch.value };
        });
        let Sader_GehaaRows = gehaatIdsObjs.map((gehaaIdObj) => {
          return {
            sader_id: reqBodyData["saderId"],
            gehaa_id: gehaaIdObj.id,
          };
        });
        // console.log({ Sader_GehaaRows });
        await Sader_Gehaa.destroy({
          where: {
            sader_id: reqBodyData["saderId"],
          },
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
