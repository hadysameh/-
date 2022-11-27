import Premission from "../../premissions/models/Premissions";
import User from "../models/User";
import UserType from "../models/UserTypes";
import Officer from "../../officers/models/OfficersModel";
import Ranks from "../../officers/models/OfficersModel";
import { IUserInfo } from "../../../types";
export default class AuthRepo {
  static async storeUser(useData: IUserInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let storedUser = await User.create({
          userName: useData.userName,
          password: useData.password,
          firstName: useData.firstName,
          lastName: useData.lastName,
          email: useData.email,
        });
        resolve(storedUser);
      } catch (error) {
        reject(error);
      }
    });
  }
  static async getUserByUserName(userName: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await User.findOne({
          where: {
            userName: userName,
          },
          include: [
            { model: UserType, include: [Premission] },
            { model: Officer, include: [Ranks] },
          ],
        });
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  static async editUser(): Promise<any> {}
  static async deleteUser(id: string) {}
}
