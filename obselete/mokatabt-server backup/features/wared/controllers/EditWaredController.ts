import { Request, Response } from "express";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
import EditWaredRepo from "../repos/EditWaredRepo";
class EditWaredController {
  public static async update(req: Request, res: Response): Promise<any> {
    // console.log({ body: req.body });
    // console.log({file:req.file})
    let filePathToStore: string | null = null;
    if (req.file) {
      let filePathInUploadsFolder = req.file?.destination.replace(
        "./uploads/",
        ""
      );
      filePathToStore = req.file
        ? filePathInUploadsFolder + "/" + req.file.filename
        : "";
    }

    try {
      // console.log({ filePath: req.file?.path });

      await EditWaredRepo.update(req.body, filePathToStore);
      emitSocketEvent(socketIoEvent.refetchWared);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
}

export default EditWaredController;
