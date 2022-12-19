import { Request, Response } from "express";
import SaderBoxRepo from "../repos/SaderBoxRepo";
export default class SaderBoxController {
    
  public static async getSearchOptions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let result = await SaderBoxRepo.getSearchOptions();
      // console.log({result});
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }

  public static async getSearch(req: Request, res: Response): Promise<any> {
    let params = req.query;
    // console.log({params})
    try {
      let result = await SaderBoxRepo.getWithParams(params, req);
      // console.log({result});
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
}
