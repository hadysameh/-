import { Request, Response } from "express";
import emitSocketEvent from "../../../helpers/socketIo";
import { socketIoEvent } from "../../../types";
import UpdateMokatbaOfficersAndBranchesRepo from "../repos/UpdateMokatbaOfficersAndBranchesRepo";
class UpdateMokatbaOfficersAndBranchesContoller {
  public static async updateOfficersAndBranches(
    req: Request,
    res: Response
  ): Promise<any> {
    UpdateMokatbaOfficersAndBranchesRepo.updateOfficersAndBranches(req);
    try {
      await UpdateMokatbaOfficersAndBranchesRepo.updateOfficersAndBranches(req);
      emitSocketEvent(socketIoEvent.refetchWared);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error, { msg: "faild to store" });
      res.status(500).json("wrong password please try again");
    }
  }
}
export default UpdateMokatbaOfficersAndBranchesContoller;
