import AuthRepo from "../repos/AuthRepo";
import { Request, Response } from "express";
import { compareHashed } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
export default class AuthController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      let data = req.body;
      const userData = {
        userName: data.userName,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email ? data.email : null,
      };
      // console.log({ userData });
      let storedUser = await AuthRepo.storeUser(userData);
      res.status(200).json(storedUser);
    } catch (error) {
      console.log({ error });
      res.status(400).json({
        msg: "failed to store",
      });
    }
  }
  static async login(req: Request, res: Response): Promise<any> {
    try {
      let data = req.body;
      let { userName, password } = data;
      // console.log(data)
      let user = await AuthRepo.getUserByUserName(userName).catch(() => {
        return null;
      });
      if (user) {
        let isCorrectPassword = await compareHashed(password, user.password);
        if (isCorrectPassword) {
          let privateKey = String(process.env.jwtKey);
          let token = jwt.sign(user.id, privateKey);

          res.json({ user, token });
        } else {
          res.status(403).json({ msg: "password is incorrect" });
        }
      } else {
        res.status(403).json({ msg: "userName is incorrect or not exists" });
      }
    } catch (error) {}
  }
  static async isAuth(req: any, res: Response): Promise<any> {
    res.send(req.user);
  }
}
