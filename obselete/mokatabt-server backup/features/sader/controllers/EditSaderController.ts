import { Request, Response } from "express";
import { socketIoEvent } from "../../../types";
import emitSocketEvent from "../../../helpers/socketIo";
import EditSaderRepo from "../repos/EditSaderRepo";

export default class EditSaderController {
    public static async update(req: Request, res: Response): Promise<any> {
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
        // console.log(req.body);
        try {
          await EditSaderRepo.update(req.body, filePathToStore);
          emitSocketEvent(socketIoEvent.refetchSader);
    
          res.status(200).json({ msg: "ok" });
        } catch (error) {
          console.log(error, { msg: "faild to store" });
          // res.status(500);
          res.status(500).json("wrong password please try again");
        }
      }
    
}