import { dbConnection } from "../db";
import Wared from "../models/WaredModel";
import Officers from "../models/OfficersModel";
import Branches from "../models/BranchesModel";
import Gehaa from "../models/GehaaModel";
import Wared_Branches from "../models/Wared_BranchesModel";
import Wared_Officers from "../models/Wared_OfficersModel";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import sequelize from "../db/seqeulize";
import { Op } from "sequelize";
// import dateFormat from 'date-format'
class WaredRepo {
  public static async getById(id: any): Promise<any> {
    let mokatba = await Wared.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Officers,
          as: "Wared_Officers",
        },
        Branches,
        Gehaa,
      ],
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
        as: "Wared_Officers",
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
    // console.log({ whereParams });
    let wareds = await Wared.findAll({
      where: whereParams,
      include: [
        {
          model: Officers,
          as: "Wared_Officers",
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
  public static async store(
    reqBodyData: any,
    fileLocationPath: string
  ): Promise<any> {
    // console.log({ reqBodyData, fileLocationPath });

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
        }).catch((err) => {
          return null;
        });
        let lastWared_id = lastWared?.getDataValue("id");
        let storedWared = await Wared.create({
          doc_num: reqBodyData.doc_num,
          doc_dept_num: reqBodyData.doc_dept_num,
          doc_date: reqBodyData.doc_date,
          subject: reqBodyData.subject,
          docDeadline: reqBodyData.docDeadline ? reqBodyData.docDeadline : null,
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

        //this should be consists of the officers ids and branches managers ids

        //pt1 for the branches managers
        let waredTrackingOfficersRowsPt1 = selectedBranchesManagers.map(
          (selectedBranchesManagers) => {
            return {
              wared_id: storedWared.getDataValue("id"),
              officer_id: selectedBranchesManagers.getDataValue("manager_id"),
            };
          }
        );

        //pt2 for the officers
        let waredTrackingOfficersRowsPt2 = officersIdsObjs.map(
          (officerIdObj) => {
            return {
              wared_id: Number(storedWared.getDataValue("id")),
              officer_id: officerIdObj.id,
            };
          }
        );
        let waredtrackingOfficersRows = [
          ...waredTrackingOfficersRowsPt1,
          ...waredTrackingOfficersRowsPt2,
        ];
        // console.log({stored_wared_officers});
        let storedWaredTrackingOfficers = await WaredTrackingOfficers.bulkCreate(
          waredtrackingOfficersRows
        );
        resolve();
        await t.commit();
      } catch (error) {
        // console.log(error)
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await t.rollback();
        reject(error);
      }
    });
  }
  public static async update(
    reqBodyData: any,
    fileLocationPath: string | null = null
  ) {
    // console.log({
    //   reqBodyData,
    //   // fileLocationPath,
    // });
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
        console.log({ officersIdsObjs });
        let branchesIdsArr = selectedBranchs.map((branch: any) => {
          return branch.value;
        });
        let lastWared = await Wared.findOne({
          where: {
            doc_num: reqBodyData.lastWaredNum,
          },
        }).catch((err) => {
          return null;
        });
        let lastWared_id = lastWared?.getDataValue("id");
        let modifiedWaredData: any = {
          doc_num: reqBodyData.doc_num,
          doc_dept_num: reqBodyData.doc_dept_num,
          doc_date: reqBodyData.doc_date,
          subject: reqBodyData.subject,
          docDeadline: reqBodyData.docDeadline ? reqBodyData.docDeadline : null,
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
        //this should be consists of the officers ids and branches managers ids

        //pt1 for the branches managers
        let waredTrackingOfficersRowsPt1 = selectedBranchesManagers.map(
          (selectedBranchesManagers) => {
            return {
              wared_id: reqBodyData["waredId"],
              officer_id: selectedBranchesManagers.getDataValue("manager_id"),
            };
          }
        );

        //pt2 for the officers
        let waredTrackingOfficersRowsPt2 = officersIdsObjs.map(
          (officerIdObj) => {
            return {
              wared_id: Number(reqBodyData["waredId"]),
              officer_id: officerIdObj.id,
            };
          }
        );
        let waredtrackingOfficersRows = [
          ...waredTrackingOfficersRowsPt1,
          ...waredTrackingOfficersRowsPt2,
        ];

        await WaredTrackingOfficers.destroy({
          where: {
            wared_id: reqBodyData["waredId"],
          },
        });
        let modifiedWaredTrackingOfficers = await WaredTrackingOfficers.bulkCreate(
          waredtrackingOfficersRows,
          {
            updateOnDuplicate: ["wared_id"],
          }
        );
        // let modifiedWaredTrackingOfficers = await WaredTrackingOfficers.update(
        //   waredtrackingOfficersRows,
        //   {
        //     where: { wared_id: reqBodyData["waredId"] },
        //   }
        // );
        resolve();
        await t.commit();
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
export default WaredRepo;
