import { Request } from "express";
import Wared from "../models/WaredModel";

class DeleteWaredRepo {
  public static async deleteWared(req: Request) {
    return new Promise((resolve: any, reject: any) => {
      // console.log({waredId:req.body.waredId})
      let waredId = req.body.waredId;
      Wared.destroy({
        where: {
          id: waredId,
        },
      })

        .then(() => {
          resolve("deleted wared");
        })
        .catch(() => {
          reject("faild to delete wared");
        });
    });
  }
}
export default DeleteWaredRepo;
