import { Request, Response } from "express";
import { socketIoEvent } from "../../../types";
import emitSocketEvent from "../../../helpers/socketIo";
import CreateSaderRepo from "../repos/CreateSaderRepo";
export default class CreateSaderController {
  public static async store(req: Request, res: Response): Promise<any> {
    let filePathInUploadsFolder = req.file?.destination.replace(
      "./uploads/",
      ""
    );
    let filePathToStore: string = req.file
      ? filePathInUploadsFolder + "/" + req.file.filename
      : "";
    try {
      await CreateSaderRepo.store(req.body, filePathToStore);
      emitSocketEvent(socketIoEvent.refetchSader);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
}
