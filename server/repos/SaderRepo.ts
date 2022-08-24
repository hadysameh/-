import Wared from "../models/WaredModel";
import Sader from "../models/SaderModel";
import Officers from "../models/OfficersModel";
import Branches from "../models/BranchesModel";
import Gehaa from "../models/GehaaModel";
import Wared_Branches from "../models/Wared_BranchesModel";
import Wared_Officers from "../models/Wared_OfficersModel";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import sequelize from "../db/seqeulize";
import { Request } from "express";
import getTodaysDate from "../utils/getTodaysDate";
import getCurrentYear from "../utils/getCurrentYear";
import addDaysToDate from "../utils/addDaysToDate";
import { Op } from "sequelize";
import Sadertrackingofficers from "../models/SadertrackingofficersModel";
import Sader_Gehaa from "../models/Sader_GehaaModel";
export default class SaderRepo {
  public static async getById(id: any): Promise<any> {
    let mokatba = await Sader.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Officers,
          as: "SaderOfficer",
        },
        Wared,
        Branches,
        Gehaa,
      ],
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
  public static async getWithParams(
    searchParams: any,
    req: Request
  ): Promise<any> {
    const hasAccessToAllSader =
      req.user.userType.premissions.find((premission: any) => {
        return premission.premission === "has access to all sader";
      }) || req.user.userType.type === "admin";

    const hasAccessToBranchSader = req.user.userType.premissions.find(
      (premission: any) => {
        return premission.premission === "has access to branch sader";
      }
    );

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
    if (searchParams.lastWaredNum) {
      includeParams.push({
        model: Wared,
        where: { doc_num: searchParams.lastWaredNum },
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
          model: Officers,
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
          model: Officers,
          as: "SaderOfficer",
        },
        {
          model: Officers,
          as: "Sadertrackingofficers",
        },
        Branches,
        Wared,
        Gehaa,
        ...includeParams,
      ],
      limit: Number(searchParams.numOfRecords),
      order: orderByArr.length == 0 ? [["id", "DESC"]] : orderByArr,
      offset: Number(searchParams.numOfRecords) * Number(searchParams.pageNum),
    });
    return saders;
  }

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
            doc_num: reqBodyData.lastWaredNum,
          },
        }).catch((err) => {
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
          lastWared_id,
          register_date: getTodaysDate(),
          type: reqBodyData.type,
          register_user: "1",
          attach: fileLocationPath,
        });

        await Sadertrackingofficers.bulkCreate([
          {
            officer_id: assistantBranchId,
            sader_id: storedSader.getDataValue("id"),
          },
          {
            officer_id: reqBodyData.officer_id,
            sader_id: storedSader.getDataValue("id"),
          },
        ]);
        let gehaatIdsObjs: { id: any }[] = selectedGehaat.map((branch: any) => {
          return { id: branch.value };
        });
        let Sader_GehaaRows = gehaatIdsObjs.map((gehaaIdObj) => {
          return {
            sader_id: storedSader.getDataValue("id"),
            gehaa_id: gehaaIdObj.id,
          };
        });
        // console.log({ Sader_GehaaRows });

        await Sader_Gehaa.bulkCreate(Sader_GehaaRows);

        t.commit();
        resolve();
      } catch (error) {
        t.rollback();
        reject(error);
      }
    });
  }
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
            doc_num: reqBodyData.lastWaredNum,
          },
        }).catch((err) => {
          return null;
        });
        let lastWared_id = lastWared ? lastWared.getDataValue("id") : null;
        let assistantBranch = await Branches.findOne({
          where: {
            id: reqBodyData.branch_id,
          },
        }).catch((err) => {
          return null;
        });
        let assistantBranchId = assistantBranch?.getDataValue("id");
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
        let modifiedSader = await Sader.update(modifiedSaderData, {
          where: { id: reqBodyData["saderId"] },
        });
        await Sadertrackingofficers.destroy({
          where: {
            sader_id: reqBodyData["saderId"],
          },
        });
        await Sadertrackingofficers.bulkCreate([
          {
            officer_id: assistantBranchId,
            sader_id: reqBodyData["saderId"],
          },
          {
            officer_id: reqBodyData.officer_id,
            sader_id: reqBodyData["saderId"],
          },
        ]);
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
  public static async delete(req:Request){
    return new Promise((resolve: any, reject: any) => {
      let saderId = req.body.saderId;
      Sader.destroy({
        where: {
          id: saderId,
        },
      }).then(()=>{resolve('deleted wared')}).catch(()=>{reject('faild to delete wared')})
    });
  }
}
