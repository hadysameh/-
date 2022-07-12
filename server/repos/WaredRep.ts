import { dbConnection } from "../db";
import Wared from "../models/WaredModel";
import Officers from "../models/OfficersModel";
import Branches from "../models/BranchesModel";
import Gehaa from "../models/GehaaModel";
import { Op } from "sequelize";
// import dateFormat from 'date-format'
class WaredRepo {
  public static async getById(id: any): Promise<any> {
    let mokatba = await Wared.findOne({
      where: {
        id,
      },
      include: [Officers, Branches, Gehaa],
    });
    return mokatba;
  }

  public static async get(pageNum: any, numOfRecords: any): Promise<any> {}

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
    const todaysDate = new Date().toISOString().slice(0, 19).replace(/T.*/, "");
    const addDaysToDate = (date: string, numOfDays: any) => {
      let tempDate = new Date(date);
      tempDate.setDate(tempDate.getDate() + Number(numOfDays));
      // console.log(
      //   new Date(tempDate).toISOString().slice(0, 19).replace(/T.*/, ""),
      //   {
      //     date,
      //     numOfDays,
      //   }
      // );
      let result = new Date(tempDate)
        .toISOString()
        .slice(0, 19)
        .replace(/T.*/, "");
      console.log({ result });
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
      // whereParams["branches_id"] = `${searchParams.branchId}`;
    }
    if (searchParams.officerId) {
      includeParams.push({
        model: Officers,
        where: { id: searchParams.officerId },
      });
      // whereParams["id"] = `${searchParams.officerId}`;
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
    console.log({ whereParams });
    let wareds = await Wared.findAll({
      where: whereParams,
      include: [Officers, Branches, Gehaa, ...includeParams],
      limit: Number(searchParams.numOfRecords),
      order: orderByArr.length == 0 ? [["register_date", "DESC"]] : orderByArr,
      offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
    });
    return wareds;
  }
}
export default WaredRepo;
