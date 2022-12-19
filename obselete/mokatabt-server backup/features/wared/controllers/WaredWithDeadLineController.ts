import { Request, Response } from "express";
import WaredWithDeadLineRepo from "../repos/WaredWithDeadLineRepo";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
class WaredWithDeadLineController {
  public static async getAllWaredWithDeadLine(
    req: Request,
    res: Response
  ): Promise<any> {
    let id = req.query.id;
    try {
      let result = await WaredWithDeadLineRepo.getAllWaredWithDeadLine(req);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
}
export default WaredWithDeadLineController;
