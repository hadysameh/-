import { Request, Response } from "express";
import WaredRepo from "../repos/WaredRepo";
import emitSocketEvent from "../helpers/socketIo";
import {socketIoEvent} from '../types'
class WaredController {
  public static async getNumberOfUnreadWared(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let result = await WaredRepo.getNumberOfUnreadWared(req);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }

  public static async getAllWaredWithDeadLine(
    req: Request,
    res: Response
  ): Promise<any> {
    let id = req.query.id;
    try {
      let result = await WaredRepo.getAllWaredWithDeadLine(req);
      res.json(result);
    } catch (error) {
      console.log({ error });
    }
  }
  public static async getOne(req: Request, res: Response): Promise<any> {
    // console.log({ reqParams: req.query });
    let id = req.query.id;
    try {
      let result = await WaredRepo.getById(id);
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
    try {
      let result = await WaredRepo.getWithParams(params, req);
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
    // console.log({file:req.file})
    let filePathToStore: string = req.file
      ? filePathInUploadsFolder + "/" + req.file.filename
      : "";
    try {
      await WaredRepo.store(req.body, filePathToStore);
      emitSocketEvent(socketIoEvent.refetchWared);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json({ error });
    }
  }

  public static async update(req: Request, res: Response): Promise<any> {
    // console.log({ body: req.body });
    // console.log({file:req.file})
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

    try {
      // console.log({ filePath: req.file?.path });

      await WaredRepo.update(req.body, filePathToStore);
      emitSocketEvent(socketIoEvent.refetchWared);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }

  public static async delete(req: Request, res: Response): Promise<any> {
    try {
      await WaredRepo.deleteWared(req)
        .then((msg) => {
          emitSocketEvent(socketIoEvent.refetchWared);

          res.status(200).json(msg);
        })
        .catch((msg) => {
          res.status(400).json(msg);
        });
    } catch (error) {}
  }

  public static async updateOfficersAndBranches(
    req: Request,
    res: Response
  ): Promise<any> {
    WaredRepo.updateOfficersAndBranches(req);
    try {
      // console.log({ filePath: req.file?.path });

      await WaredRepo.updateOfficersAndBranches(req);
      emitSocketEvent(socketIoEvent.refetchWared);

      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      // res.status(500);
      res.status(500).json("wrong password please try again");
    }
  }
}
export default WaredController;
