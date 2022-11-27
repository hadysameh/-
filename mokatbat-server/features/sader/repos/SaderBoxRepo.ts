import Branches from "../../../models/BranchesModel";
import Gehaa from "../../../models/GehaaModel";
import Officer from "../../../models/OfficersModel";
import { Request } from "express";
import { Op } from "sequelize";
import {
  isHasAccessToAllSader,
  isHasAccessToBranchSader,
  isHasAccessToBranchWared,
} from "../../../helpers/premissionsHelpers";
import getTodaysDate from "../../../helpers/getTodaysDate";
import Wared from "../../../models/WaredModel"; 
import Sader from "../../../models/SaderModel";

export default class SaderBoxRepo {
  public static async getSearchOptions(
    searchParams: any | null = null
  ): Promise<any> {
    const getGehaat = async () => {
      let gehaat = await Gehaa.findAll();
      return gehaat;
    };
    const getBranches = async () => {
      let branches = await Branches.findAll();
      return branches;
    };
    const getOfficers = async () => {
      let officers = await Officer.findAll();
      return officers;
    };
    return new Promise((resolve: any, reject: any) => {
      Promise.all([getGehaat(), getBranches(), getOfficers()])
        .then((values) => {
          let result = {
            gehaat: values[0],
            branches: values[1],
            officers: values[2],
          };
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public static async getWithParams(
    searchParams: any,
    req: Request
  ): Promise<any> {
    let durationName = "get sader with params";
    // console.time(durationName)
    const hasAccessToAllSader = isHasAccessToAllSader(req);

    const hasAccessToBranchSader = isHasAccessToBranchSader(req);
    const todaysDate = getTodaysDate();
    let whereParams: any = {};
    let includeParams: any = [];
    let orderByArr: any = [];
    if (searchParams.docNum) {
      whereParams["doc_num"] = `${searchParams.docNum}`;
    }

    if (searchParams.gehaaId) {
      includeParams.push({
        model: Gehaa,
        where: { id: searchParams.gehaaId },
      });
      // whereParams["gehaa_id"] = `${searchParams.gehaaId}`;
    }
    if (searchParams.subject) {
      whereParams["subject"] = {
        [Op.like]: `%${searchParams.subject}%`,
      };
    }
    if (searchParams.branchId) {
      whereParams["branch_id"] = `${searchParams.branchId}`;
    }
    if (searchParams.officerId) {
      whereParams["officer_id"] = `${searchParams.officerId}`;
    }
    if (searchParams.mokatbaDate) {
      whereParams["doc_date"] = `${searchParams.mokatbaDate}`;
    }
    if (searchParams.closedWaredDocNum) {
      includeParams.push({
        model: Wared,
        as: "lastWared",
        where: { doc_num: searchParams.closedWaredDocNum },
      });
      // whereParams["branch_id"] = `${searchParams.branchId}`;
    }

    if (!hasAccessToAllSader) {
      if (hasAccessToBranchSader) {
        includeParams.push({
          model: Branches,
          where: { id: req.user.officer.branches_id },
        });
      } else {
        includeParams.push({
          model: Officer,
          as: "SaderOfficer",

          where: { id: req.user.officerId },
        });
      }
    }
    // console.log({ whereParams });
    let saders = await Sader.findAll({
      where: whereParams,
      include: [
        {
          model: Officer,
          as: "SaderOfficer",
        },
        {
          model: Officer,
          as: "Sadertrackingofficers",
        },
        Branches,
        {
          model: Wared,
          as: "waredClosedSader",
        },
        Gehaa,
        ...includeParams,
      ],
      limit: Number(searchParams.numOfRecords),
      order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
      offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
    });
    // console.timeEnd(durationName)
    // console.log({ saders });
    return saders;
  }
}
