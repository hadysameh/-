import Officer from "../../../models/OfficersModel";
import Branches from "../../../models/BranchesModel";
import Gehaa from "../../../models/GehaaModel";
import { Request } from "express";
import {
  isHasAccessToAllWared,
  isHasAccessToBranchWared,
} from "../../../helpers/premissionsHelpers";
import Wared from "../../../models/WaredModel";
import { Op } from "sequelize";

class WaredBoxRepo {
  public static async getWithParams(
    searchParams: any,
    req: Request
  ): Promise<any> {
    let durationName = "get wared with params";
    // console.time(durationName);
    const hasAccessToAllWared = isHasAccessToAllWared(req);

    const hasAccessToBranchWared = isHasAccessToBranchWared(req);

    const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
    const addDaysToDate = (date: string, numOfDays: any) => {
      let tempDate = new Date(date);
      tempDate.setDate(tempDate.getDate() + Number(numOfDays));

      let result = new Date(tempDate)
        .toISOString()
        .slice(0, 19)
        .replace(/T.*/, "");
      // console.log({ result });
      return result;
    };
    let whereParams: any = {};
    let includeParams: any = [];
    let orderByArr: any = [];
    if (searchParams.docNum) {
      whereParams["doc_num"] = `${searchParams.docNum}`;
    }
    if (searchParams.docDeptNum) {
      whereParams["doc_dept_num"] = `${searchParams.docDeptNum}`;
    }
    if (searchParams.gehaaId) {
      whereParams["gehaa_id"] = `${searchParams.gehaaId}`;
    }
    if (searchParams.subject) {
      whereParams["subject"] = {
        [Op.like]: `%${searchParams.subject}%`,
      };
    }
    if (searchParams.branchId) {
      includeParams.push({
        model: Branches,
        where: { id: searchParams.branchId },
      });
    }
    if (searchParams.officerId) {
      includeParams.push({
        model: Officer,
        as: "Wared_Officers",
        where: { id: searchParams.officerId },
      });
    }
    if (searchParams.mokatbaDate) {
      whereParams["doc_date"] = `${searchParams.mokatbaDate}`;
    }
    if (searchParams.withinExcutionTimeType == "1") {
      if (searchParams.DaysBeforeExecution) {
        whereParams["docDeadline"] = {
          // $gt: new Date(),
          [Op.lte]: `${addDaysToDate(
            todaysDate,
            searchParams.DaysBeforeExecution
          )}`,
        };
        whereParams["closedSader_id"] = null;
        whereParams["known"] = 0;
        orderByArr.push(["docDeadline", "DESC"]);
      }
    } else if (searchParams.withinExcutionTimeType == "2") {
      if (searchParams.DaysBeforeExecution) {
        whereParams["docDeadline"] = {
          // $gt: new Date(),
          [Op.gt]: `${addDaysToDate(
            todaysDate,
            searchParams.DaysBeforeExecution
          )}`,
        };
        whereParams["closedSader_id"] = null;
        whereParams["known"] = 0;
        orderByArr.push(["docDeadline", "DESC"]);
      }
    }

    if (!hasAccessToAllWared) {
      if (hasAccessToBranchWared) {
        includeParams.push({
          model: Branches,
          where: { id: req.user.officer.branches_id },
        });
      } else {
        includeParams.push({
          model: Officer,
          as: "Wared_Officers",
          where: { id: req.user.officerId },
        });
      }
    }

    // console.log({ includeParams });
    let wareds = await Wared.findAll({
      where: whereParams,
      include: [
        {
          model: Officer,
          as: "Wared_Officers",
        },
        {
          model: Officer,
          as: "WaredTrackingOfficers",
        },
        Branches,
        Gehaa,
        ...includeParams,
      ],
      limit: Number(searchParams.numOfRecords),
      order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
      offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
    });
    return wareds;
  }
}
export default WaredBoxRepo;
