import Wared from "../models/WaredModel";
import Sader from "../models/SaderModel";
import Officers from "../models/OfficersModel";
import Branches from "../models/BranchesModel";
import Gehaa from "../models/GehaaModel";
import Wared_Branches from "../models/Wared_BranchesModel";
import Wared_Officers from "../models/Wared_OfficersModel";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import sequelize from "../db/seqeulize";

import getTodaysDate from "../utils/getTodaysDate";
import getCurrentYear from "../utils/getCurrentYear";
import addDaysToDate from "../utils/addDaysToDate";
import { Op } from "sequelize";
export default class SaderRepo {
  public static async getById(id: any): Promise<any> {
    let mokatba = await Sader.findOne({
      where: {
        id,
      },
      include: [Officers, Branches, Gehaa],
    });
    return mokatba;
  }
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
      let officers = await Officers.findAll();
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
          // console.log(values);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  public static async getWithParams(searchParams: any): Promise<any> {
    const todaysDate = getTodaysDate();
console.log({searchParams})
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
    if (searchParams.lastWaredNum) {
      includeParams.push({
        model: Wared,
        where: { doc_num: searchParams.lastWaredNum },
      });
      // whereParams["branch_id"] = `${searchParams.branchId}`;
    }
    // console.log({ whereParams });
    let saders = await Sader.findAll({
      where: whereParams,
      include: [Officers, Branches, Wared, Gehaa, ...includeParams],
      limit: Number(searchParams.numOfRecords),
      order: orderByArr.length == 0 ? [["register_date", "DESC"]] : orderByArr,
      offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
    });
    return saders;
  }
}
