import { Request, Response } from "express";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
import DeleteSaderRepo from "../repos/DeleteSaderRepo";
export default class DeleteSaderController {
  public static async delete(req: Request, res: Response): Promise<any> {
    try {
      await DeleteSaderRepo.delete(req)
        .then((msg: any) => {
          emitSocketEvent(socketIoEvent.refetchSader);

          res.status(200).json(msg);
        })
        .catch((msg) => {
          res.status(400).json(msg);
        });
    } catch (error) {}
  }
}
