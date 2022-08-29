import { Request, Response } from "express";
import WaredTrackingOfficers from "../models/WaredTrackingOfficersModel";
import emitSocketEvent from "../helpers/socketIo";

export default class WaredTrackingOfficersController {
  public static async store(req: Request, res: Response): Promise<any> {
    let officerId = req.user.officerId;
    let waredId = req.body.waredId;

    try {
      const [
        waredTrackingOfficersRow,
        created,
      ] = await WaredTrackingOfficers.upsert({
        officer_id: officerId,
        wared_id: waredId,
      });
      emitSocketEvent("refetchWaredAndSaderUnreadNumbersNoSound");

      res.status(200).json({});
    } catch (error) {}
  }
}
