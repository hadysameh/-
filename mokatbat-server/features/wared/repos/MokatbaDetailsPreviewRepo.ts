import { Request, Response } from "express";
import Wared from "../../../models/WaredModel";
import Officer from "../../../models/OfficersModel";
import Branches from "../../../models/BranchesModel";
import Gehaa from "../../../models/GehaaModel";
import Sader from "../../../models/SaderModel";

class MokatbaDetailsPreviewRepo {
  public static async getById(id: any): Promise<any> {
    let mokatba = await Wared.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Officer,
          as: "Wared_Officers",
        },
        Branches,
        Gehaa,
        {
          model:Sader,
          as:'waredClosedSader'
          
        }
      ],
    });
    return mokatba;
  }
}

export default MokatbaDetailsPreviewRepo;
