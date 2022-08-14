import Premission from "../models/NewAuthModels/Premissions";
import User from "../models/NewAuthModels/User";
import UserType from "../models/NewAuthModels/UserTypes";
import Officers from "../models/OfficersModel";
import { IUserInfo } from "../types";
export default class AuthRepo {
  static async storeUser(useData: IUserInfo): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log({ useData });
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
          include: [{ model: UserType, include: [Premission] }, Officers],
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
