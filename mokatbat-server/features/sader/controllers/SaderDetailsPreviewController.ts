import { Request, Response } from "express";
import SaderDetailsPreviewRepo from "../repos/SaderDetailsPreviewRepo";

export default class SaderDetailsPreviewController {
  public static async getOne(req: Request, res: Response): Promise<any> {
    let saderId = req.query.id;
    // console.log({ saderId, req: req.query });
    let sader = await SaderDetailsPreviewRepo.getById(saderId);
    res.json(sader);
  }
}
