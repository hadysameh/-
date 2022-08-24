import { Request, Response } from "express";
import Sadertrackingofficers from "../models/SadertrackingofficersModel";

export default class SaderTrackingOfficersController {
  public static async store(req: Request, res: Response): Promise<any> {
    let officerId = req.user.officerId;
    let saderId = req.body.saderId;
    // console.log({ officerId, saderId });
    try {
      const [
        saderTrackingOfficersRow,
        created,
      ] = await Sadertrackingofficers.upsert({
        officer_id: officerId,
        sader_id: saderId,
      });
    //   console.log({ saderTrackingOfficersRow, created });
      res.status(200).json({});
    } catch (error) {}
  }
}
