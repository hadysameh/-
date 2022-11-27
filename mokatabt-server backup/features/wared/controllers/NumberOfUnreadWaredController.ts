import { Request, Response } from "express";
import NumberOfUnreadWaredRepo from "../repos/NumberOfUnreadWaredRepo";

export default class NumberOfUnreadSaderController {
  public static async getNumberOfUnreadWared(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let result = await NumberOfUnreadWaredRepo.getNumberOfUnreadWared(req);
      res.json(result);
    } catch (error) {
      console.log({ msg: "error in NumberOfUnreadSaderController", error });
    }
  }
}
