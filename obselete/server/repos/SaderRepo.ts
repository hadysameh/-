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
import Config from "../models/ConfigModel";
import { premissions } from "../types";

import Sadertrackingofficers from "../models/SadertrackingofficersModel";
import Sader_Gehaa from "../models/Sader_GehaaModel";
import {
  isHasAccessToAllSader,
  isHasAccessToBranchSader,
  isHasAccessToBranchWared,
} from "./helpers/premissionsHelpers";
import { json } from "body-parser";
import { Json } from "sequelize/types/utils";
export default class SaderRepo {
  private static async reopenWaredThatWasClosedByTHisSader(saderId: string) {
    await Wared.update(
      { known: 0, closedSader_id: null },
      { where: { known: 1, closedSader_id: saderId } }
    );
  }
  private static async closeOpenedWared(
    waredsInfo: { value: string; label: string }[],
    saderId: string
  ) {
    if (typeof waredsInfo !== "object") {
      waredsInfo = JSON.parse(waredsInfo);
    }
    // console.log({waredsInfo})
    for (const key in waredsInfo) {
      const waredInfo = waredsInfo[key];
      console.log({ waredInfo, id: waredInfo.value });

      await Wared.update(
        { known: 1, closedSader_id: saderId },
        { where: { id: waredInfo.value } }
      );
      console.log("finish closeOpenedWared");
    }
  }

  public static async getNumberOfUnreadSader(req: Request) {
    let saderIncludeParams = [];

    let config = await Config.findOne();
    const hasAccessToAllSader = isHasAccessToAllSader(req);

    const hasAccessToBranchWared = isHasAccessToBranchWared(req);

    if (!hasAccessToAllSader) {
      if (hasAccessToBranchWared) {
        saderIncludeParams.push({
          model: Branches,
          where: { id: req.user.officer.branches_id },
        });
      } else {
        saderIncludeParams.push({
          model: Officers,
          as: "SaderOfficer",
          where: { id: req.user.officerId },
        });
      }
    }

    let numberOfSaderAfterLaunchForOfficer = await Sader.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [...saderIncludeParams],
    });

    let numberOfreadSader = await Sader.count({
      where: {
        doc_date: { [Op.gte]: config?.getDataValue("dateOfLaunch") },
      },
      include: [
        ...saderIncludeParams,
        {
          model: Officers,
          where: { id: { [Op.eq]: req.user.officerId } },
          as: "Sadertrackingofficers",
        },
      ],
    });
    return numberOfSaderAfterLaunchForOfficer - numberOfreadSader;
  }

  public static async getById(id: any): Promise<any> {
    console.log({ Wared: JSON.stringify(Wared) });
    let mokatba = await Sader.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Officers,
          as: "SaderOfficer",
        },
        {
          model: Wared,
          as: "waredClosedSader",
          // where: { closedSader_id: id },
        },
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
        {
          model: Wared,
          as: "waredClosedSader",
          // as: "Wared_lastSader_id",
          // where: { closedSader_id: req.user.officerId },
        },
        // {
        //   model: Wared,
        //   as: "Wared_closedSader_id",
        // },
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
          lastWared_id: lastWared_id ? lastWared_id : null,
          register_date: getTodaysDate(),
          type: reqBodyData.type,
          register_user: "1",
          attach: fileLocationPath,
        });
        if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
          await this.closeOpenedWared(
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
        }).catch((err) => {
          return null;
        });
        let lastWared_id = lastWared ? lastWared.getDataValue("id") : null;
        // let assistantBranch = await Branches.findOne({
        //   where: {
        //     id: reqBodyData.branch_id,
        //   },
        // }).catch((err) => {
        //   return null;
        // });
        // let assistantBranchId = assistantBranch?.getDataValue("id");
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
        if (reqBodyData["selectedMokatbatWithDeadLineForSader"]) {
          await this.reopenWaredThatWasClosedByTHisSader(
            reqBodyData["saderId"]
          );
          await this.closeOpenedWared(
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
  public static async delete(req: Request) {
    return new Promise((resolve: any, reject: any) => {
      let saderId = req.body.saderId;
      // console.log({ saderId: req.body.saderId });

      Sader.destroy({
        where: {
          id: saderId,
        },
      })
        .then(() => {
          resolve("deleted wared");
        })
        .catch(() => {
          reject("faild to delete wared");
        });
    });
  }
}
