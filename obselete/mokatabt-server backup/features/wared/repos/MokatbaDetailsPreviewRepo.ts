import { Request, Response } from "express";
import Wared from "../models/WaredModel";
import { Officer } from "../../officers";
import { Branches } from "../../branches";
import { Gehaa } from "../../gehaa";

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
      ],
    });
    return mokatba;
  }
}

export default MokatbaDetailsPreviewRepo;
