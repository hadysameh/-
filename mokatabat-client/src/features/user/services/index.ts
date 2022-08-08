import axios from "axios";
import { serverApiUrl } from "../../../config";
export function postloginData(loginData: any) {
    return new Promise((resolve: any, reject: any) => {
      axios
        .post(serverApiUrl+"api/login", loginData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
export function postRegisterData(regData: any) {
    return new Promise((resolve: any, reject: any) => {
      axios
        .post(serverApiUrl+"api/register", regData,{withCredentials:true})
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }