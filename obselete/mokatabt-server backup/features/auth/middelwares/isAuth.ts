import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import UserType from "../models/UserTypes";
import { Premission } from "../../premissions";
import Officer from "../../officers/models/OfficersModel";
import Branches from "../../branches/models/BranchesModel";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
        userTypeId: string;
        officerId: string;
        officer: {
          id: string;
          mil_num: string;
          akdameh_num: string;
          national_number: string;
          name: string;
          sub_seen: string;
          level: string;
          arms_id: string;
          branches_id: string;
          Ranks_id: string;
          subbranches_id: string;
          user_id: string;
          branch: { id: string; name: string; manager_id: string };
        };
        usertype: {
          id: any;
          type: any;
          createdAt: any;
          updatedAt: any;
          premissions: any[];
        };
      };
    }
  }
}

export default async function isAuth(req: any, res: Response, next: any) {
  try {
    let privateKey = String(process.env.jwtKey);
    let token = req.headers["authorization"];
    if (token === "null") {
      res.status(403).json({ msg: "unautherized" });
    } else if (token) {
      var decoded = jwt.verify(token, privateKey);
      let user = await User.findOne({
        where: {
          id: decoded,
        },
        include: [
          { model: UserType, include: [Premission] },
          { model: Officer, include: [Branches] },
        ],
      }).catch(() => {
        return null;
      });
      if (user) {
        // console.log({ user: JSON.stringify(user) });
        req.user = user;
        next();
      } else {
        res.status(403).json({ msg: "unautherized" });
      }
    } else {
      res.status(403).json({ msg: "unautherized" });
    }
  } catch (error) {
    console.log(error);
  }

  // console.log(decoded.foo)
}
