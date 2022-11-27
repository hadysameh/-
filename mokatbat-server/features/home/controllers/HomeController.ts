import { Request, Response } from "express";
import HomeRepo from "../repos/HomeRepo";
class HomeController {
  public static async index(req: Request, res: Response): Promise<any> {
    try {
      let data = await HomeRepo.index(req);
      res.json(data);
    } catch (error) {
      console.log(error, { msg: "faild to fetch" });
      res.status(400).json("wrong password please try again");
    }
  }
}
export default HomeController;
