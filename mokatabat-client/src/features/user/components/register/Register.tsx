import "../../assets/style.css";
import { postRegisterData } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  return (
    <>
      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postRegisterData({
              userName,
              password,
              firstName,
              lastName,
              email,
            })
              .then((res) => {
                // navigate("/");
              })
              .catch((err) => {
                alert(err);
              });
          }}
        >
          <h1> انشاء حساب</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
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
            <div className="input-field">
              <input
                type="text"
                placeholder="firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                autoComplete="nope"
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="lastname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                autoComplete="nope"
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Email(optional)"
                autoComplete="nope"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex  justify-content-center">
            <button className="btn btn-primary fs-4 mb-4">انشاء حساب </button>
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
