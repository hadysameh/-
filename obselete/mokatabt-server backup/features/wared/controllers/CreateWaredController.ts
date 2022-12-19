import { Request, Response } from "express";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
import CreateWaredRepo from "../repos/CreateWaredRepo";

class CreateWaredController {
  public static async store(req: Request, res: Response): Promise<any> {
    let filePathInUploadsFolder = req.file?.destination.replace(
      "./uploads/",
      ""
    );
    // console.log({file:req.file})
    let filePathToStore: string = req.file
      ? filePathInUploadsFolder + "/" + req.file.filename
      : "";
    try {
      await CreateWaredRepo.store(req.body, filePathToStore);
      emitSocketEvent(socketIoEvent.refetchWared);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json({ error });
    }
  }
}
export default CreateWaredController;
