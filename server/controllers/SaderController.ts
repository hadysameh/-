import { Request, Response } from "express";
import SaderRepo from "../repos/SaderRepo";
class SaderController {
  public static async getOne(req: Request, res: Response): Promise<any> {
    let saderId = req.query.id;
    console.log({ saderId, req: req.query });
    let sader = await SaderRepo.getById(saderId);
    res.json(sader);
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
    let filePathInUploadsFolder = req.file?.destination.replace(
      "./uploads/",
      ""
    );
    let filePathToStore: string = req.file
      ? filePathInUploadsFolder + "/" + req.file.filename
      : "";
    try {
      await SaderRepo.store(req.body, filePathToStore);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }

  public static async delete(req: Request, res: Response): Promise<any> {}
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
      await SaderRepo.update(req.body, filePathToStore);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
}
export default SaderController;
