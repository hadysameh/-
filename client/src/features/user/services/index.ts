import axios from "axios";
export function postloginData(loginData: any) {
  return new Promise((resolve: any, reject: any) => {
    axios
      .post("/api/login", loginData)
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
      .post("/api/register", regData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
