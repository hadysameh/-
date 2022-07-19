import { Request, Response } from "express";
import SaderRepo from "../repos/SaderRepo";
class SaderController {
  public static async getOne(req: Request, res: Response): Promise<any> {
      
  }
  public static async getSearchOptions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let result = await SaderRepo.getSearchOptions();
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
      let result = await SaderRepo.getWithParams(params);
      // console.log({result});
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
  public static async store(req: Request, res: Response): Promise<any> {
      
  }
  
  public static async delete(req: Request, res: Response): Promise<any> {
      
  }
  public static async update(req: Request, res: Response): Promise<any> {
      
  }
}
export default SaderController;
