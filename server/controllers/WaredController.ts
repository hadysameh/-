import { Request, Response } from "express";
import WaredRepo from "../repos/WaredRep";

class WaredController {
  public static async getOne(req: Request, res: Response): Promise<any> {
    // console.log({req})
    let id = req.params.id
    try {
      let result = await WaredRepo.getById(id);
      console.log({result},result._rows);
      res.json(result)
    } catch (error) {
      console.log({error});
    }
  }
  public static async get(req: Request, res: Response): Promise<any> {
    let numOfRecords = req.query.numOfRecords
    let pageNum = req.query.pageNum
    // console.log({req})
    try {
      let result = await WaredRepo.get(pageNum,numOfRecords);
      // console.log({result});
      res.json(result)
    } catch (error) {
      console.log({error});
    }
  }
  public static async getSearchOptions(req: Request, res: Response): Promise<any> {
    try {
      let result = await WaredRepo.getSearchOptions();
      // console.log({result});
      res.json(result)
    } catch (error) {
      console.log({error});
    }
  }
  public static async getSearch(req: Request, res: Response): Promise<any> {
    
    let params = req.query
    console.log({params})
    try {
      let result = await WaredRepo.getWithParams(params);
      // console.log({result});
      res.json(result)
    } catch (error) {
      console.log({error});
    }
  }
  
  public static async store(req: Request, res: Response): Promise<any> {}
  public static async delete(req: Request, res: Response): Promise<any> {}
  public static async update(req: Request, res: Response): Promise<any> {}
}
export default WaredController;
