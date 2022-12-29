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
import Config from "../../../models/ConfigModel";
import WaredTrackingOfficers from "../../../models/WaredTrackingOfficersModel";
import { Json } from "sequelize/types/utils";

class WaredBoxRepo {
  public static async getWithParams(
    searchParams: any,
    req: Request
  ): Promise<any> {
    let durationName = "get wared with params";
    let config = await Config.findOne({
      where: {
        id: 1,
      },
    });
    let daysBeforeExecution = config?.getDataValue("daysBeforeExecution");
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
      whereParams["doc_date"] = searchParams.mokatbaDate;
    }
    if (searchParams.unreadWared == "true") {
      whereParams["doc_date"] = {
        [Op.gte]: `${config?.getDataValue("dateOfLaunch")}`,
      };
      let waredsThatOfficerSaw = await Wared.findAll({
        where: {
          doc_date: {
            [Op.gte]: `${config?.getDataValue("dateOfLaunch")}`,
          },
        },
        include: [
          {
            model: Officer,
            as: "WaredTrackingOfficers",
            where: {
              id: req.user.officerId,
            },
          },
        ],
      });
      let waredsIdsThatOfficerSaw = waredsThatOfficerSaw.map(
        (wared: any) => wared.id
      );
      whereParams["id"] = {
        [Op.notIn]: waredsIdsThatOfficerSaw,
      };
    }
    if (searchParams.withinExcutionTimeType == "1") {
      whereParams["docDeadline"] = {
        // $gt: new Date(),
        [Op.lte]: `${addDaysToDate(todaysDate, daysBeforeExecution)}`,
      };
      whereParams["closedSader_id"] = null;
      whereParams["known"] = 0;
      orderByArr.push(["docDeadline", "ASC"]);
    } else if (searchParams.withinExcutionTimeType == "2") {
      let daysOfGreenWared = addDaysToDate(todaysDate, daysBeforeExecution);
      whereParams["docDeadline"] = {
        // $gt: new Date(),
        [Op.gt]: `${daysOfGreenWared}`,
      };
      whereParams["closedSader_id"] = null;
      whereParams["known"] = 0;
      orderByArr.push(["docDeadline", "ASC"]);
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
