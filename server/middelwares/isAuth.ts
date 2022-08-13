import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/NewAuthModels/User";
import UserType from "../models/NewAuthModels/UserTypes";
import Premission from "../models/NewAuthModels/Premissions";
import Officers from "../models/OfficersModel";
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
        include: [{ model: UserType, include: [Premission] }, Officers],
      }).catch(() => {
        return null;
      });
      if (user) {
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
