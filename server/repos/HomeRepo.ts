import Wared from "../models/WaredModel";
import Sader from "../models/SaderModel";
import { Op } from "sequelize";
import getTodaysDate from "../utils/getTodaysDate";
import getCurrentYear from "../utils/getCurrentYear";
import addDaysToDate from "../utils/addDaysToDate";
const daysBeforeExec = 7;
class HomeRepo {
  static async index() {
    return new Promise(async (resolve: any, reject: any) => {
      let waredCount = await Wared.count();
      let saderCount = await Sader.count();
      let redCircleCount = await Wared.count({
        where: [
          {
            docDeadline: {
              // $gt: new Date(),
              [Op.lte]: `${addDaysToDate(getTodaysDate(), 7)}`,
            },
            closedSader_id: null,
            known: 0,
          },
        ],
      });
      let greenCircleCount = await Wared.count({
        where: [
          {
            docDeadline: {
              // $gt: new Date(),
              [Op.gt]: `${addDaysToDate(getTodaysDate(), 7)}`,
            },
            closedSader_id: null,
            known: 0,
          },
        ],
      });
      resolve({
        waredCount,
        saderCount,
        redCircleCount,
        greenCircleCount,
      });
    });
  }
}
export default HomeRepo;
