import getTodaysDate from "../../../helpers/getTodaysDate";
import Wared from "../../../models/WaredModel";
import Sader from "../../../models/SaderModel";
import Officer from "../../../models/OfficersModel";
import Branches from "../../../models/BranchesModel";
import Gehaa from "../../../models/GehaaModel";

export default class SaderDetailsPreviewRepo {
  public static async getById(id: any): Promise<any> {
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
        {
          model: Wared,
          as: "lastWared",
          // where: { closedSader_id: id },
        },
        {
          model: Officer,
          as: "Sadertrackingofficers",
        },
        Branches,
        Gehaa,
        { model: Sader, as: "lastSader" },
      ],
    });
    return mokatba;
  }
}
