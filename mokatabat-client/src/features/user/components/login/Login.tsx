import "../../assets/style.css";
import { postloginData } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setData } from "../../stores/userSlice";
import { useDispatch } from "react-redux";
export function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postloginData({
              userName,
              password,
            })
              .then((res: any) => {
                let data = res.data;
                // let { user } = data;
                // console.log({ data });
                let token = data.token;
                let user = {
                  userName: data.user.userName,
                  id: data.user.id,
                };
                let officer = data.user.officer;
                let userType = data.user.userType.type;
                let premissions = data.user.userType.premissions.map(
                  (premission: any) => premission.premission
                );
                let rank = data.user.officer.rank.name;
                const dataToStore = {
                  user,
                  premissions,
                  userType,
                  officer,
                  token,
                  rank,
                };
                console.log({ dataToStore });
                dispatch(setData(dataToStore));
                //@ts-ignore
                window.bc.postMessage({ type: "loggedin" });
                navigate("/");
              })
              .catch((err) => {
                console.log({ err });
                alert(err.response.data.msg);
              });
          }}
        >
          <h1>تسجيل الدخول</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="userName"
                autoComplete="nope"
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex  justify-content-center">
            <button className="btn btn-primary fs-4 mb-4">تسجيل الدخول</button>
          </div>

          {/* <div className="action">
            <button>Register</button>
            <button>Sign in</button>
          </div> */}
        </form>
      </div>
    </>
  );
}
