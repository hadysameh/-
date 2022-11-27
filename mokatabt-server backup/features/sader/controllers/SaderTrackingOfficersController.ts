import { Request, Response } from "express";
import Sadertrackingofficers from "../models/SadertrackingofficersModel";
import emitSocketEvent from "../../../helpers/socketIo";  
import { socketIoEvent } from "../../../types";  
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
      const userCheckedSaderEvent = socketIoEvent.refetchSader + req.user.id;
      emitSocketEvent(userCheckedSaderEvent);

      res.status(200).json({});
    } catch (error) {}
  }
}
