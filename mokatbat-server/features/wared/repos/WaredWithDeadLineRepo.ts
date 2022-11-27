import { Request } from "express";
import Gehaa from "../../../models/GehaaModel";
import Wared from "../../../models/WaredModel";


class WaredWithDeadLineRepo {
  public static async getAllWaredWithDeadLine(req: Request) {
    let whereParams: any = {};
    let orderByArr: any = [];
    whereParams["closedSader_id"] = null;
    whereParams["known"] = 0;
    let wareds = await Wared.findAll({
      where: whereParams,
      order: [["id", "DESC"]],
      include: [Gehaa],
    });
    return wareds;
  }
}
export default WaredWithDeadLineRepo;
