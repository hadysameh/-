import { Request, Response } from "express";
import WaredRepo from "../repos/WaredRepo";

class WaredController {
  public static async getOne(req: Request, res: Response): Promise<any> {
    console.log({ reqParams: req.query });
    let id = req.query.id;
    try {
      let result = await WaredRepo.getById(id);
      console.log({ result }, result._rows);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
  public static async get(req: Request, res: Response): Promise<any> {
    let numOfRecords = req.query.numOfRecords;
    let pageNum = req.query.pageNum;
    // console.log({req})
    try {
      let result = await WaredRepo.get(pageNum, numOfRecords);
      // console.log({result});
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
  public static async getSearchOptions(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let result = await WaredRepo.getSearchOptions();
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
      let result = await WaredRepo.getWithParams(params);
      // console.log({result});
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }

  public static async store(req: Request, res: Response): Promise<any> {
    /*console.log({body:req.body})
    console.log({file:req.file})*/
    console.log({ filePath: req.file?.path });
    //  the file is stored due to multer middleware
    let filePathInUploadsFolder = req.file?.destination.replace(
      "./server/uploads/",
      ""
    );
    let filePathToStore: string = req.file
      ? filePathInUploadsFolder + "/" + req.file.filename
      : "";
    try {
      await WaredRepo.store(req.body, filePathToStore);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
  public static async update(req: Request, res: Response): Promise<any> {
    /*console.log({body:req.body})
    console.log({file:req.file})*/
    let filePathToStore: string|null=null;
    if (req.file) {
      let filePathInUploadsFolder = req.file?.destination.replace(
        "./server/uploads/",
        ""
      );
      filePathToStore = req.file
        ? filePathInUploadsFolder + "/" + req.file.filename
        : "";
    }

    try {
      console.log({ filePath: req.file?.path }); 

      await WaredRepo.update(req.body, filePathToStore);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
  public static async delete(req: Request, res: Response): Promise<any> {}
}
export default WaredController;
