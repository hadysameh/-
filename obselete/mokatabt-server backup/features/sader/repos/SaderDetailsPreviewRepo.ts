import getTodaysDate from "../../../helpers/getTodaysDate";
import { Wared } from "../../wared";
import { Sader } from "../../sader";
import Officer from "../../officers/models/OfficersModel";
import Branches from "../../branches/models/BranchesModel";
import Gehaa from "../../gehaa/models/GehaaModel";
export default class SaderDetailsPreviewRepo {
  public static async getById(id: any): Promise<any> {
    console.log({ Wared: JSON.stringify(Wared) });
    let mokatba = await Sader.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Officer,
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
}
