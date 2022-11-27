import { Request, Response } from "express";
import MokatbaDetailsPreviewRepo from "../repos/MokatbaDetailsPreviewRepo";
class MokatbaDetailsPreviewController {
  public static async getOne(req: Request, res: Response): Promise<any> {
    // console.log({ reqParams: req.query });
    let id = req.query.id;
    try {
      let result = await MokatbaDetailsPreviewRepo.getById(id);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
}

export default MokatbaDetailsPreviewController;
