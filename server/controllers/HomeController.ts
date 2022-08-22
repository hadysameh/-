import { Request, Response } from "express";
import HomeRepo from "../repos/HomeRepo";
class HomeController {
  public static async index(req: Request, res: Response): Promise<any> {
    try {
      // console.log({ filePath: req.file?.path });
      let data = await HomeRepo.index(req);
      res.json(data);
    } catch (error) {
      console.log(error, { msg: "faild to fetch" });
      // res.status(500);
      res.status(400).json("wrong password please try again");
    }
  }
}
export default HomeController;
