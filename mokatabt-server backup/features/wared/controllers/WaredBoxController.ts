import { Request, Response } from "express";
import WaredBoxRepo from "../repos/WaredBoxRepo";
class WaredBoxController {
  public static async getSearch(req: Request, res: Response): Promise<any> {
    let params = req.query;
    try {
      let result = await WaredBoxRepo.getWithParams(params, req);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
}
export default WaredBoxController;
