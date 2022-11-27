import { Request } from "express";
import Sader from "../../../models/SaderModel";

export default class DeleteSaderRepo {
  public static async delete(req: Request) {
    return new Promise((resolve: any, reject: any) => {
      let saderId = req.body.saderId;
      // console.log({ saderId: req.body.saderId });

      Sader.destroy({
        where: {
          id: saderId,
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
