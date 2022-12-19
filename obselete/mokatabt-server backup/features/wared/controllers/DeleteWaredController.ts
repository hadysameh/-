import { Request, Response } from "express";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
import DeleteWaredRepo from "../repos/DeleteWaredRepo";

class DeleteWaredController {
  public static async delete(req: Request, res: Response): Promise<any> {
    try {
      await DeleteWaredRepo.deleteWared(req)
        .then((msg) => {
          emitSocketEvent(socketIoEvent.refetchWared);

          res.status(200).json(msg);
        })
        .catch((msg) => {
          res.status(400).json(msg);
        });
    } catch (error) {}
  }
}
export default DeleteWaredController;
