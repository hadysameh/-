import { Link } from "react-router-dom";
import HasAccessToShowComponent from "../middlewares/componentsGaurds/HasAccessToShowComponent";
import { useSelector } from "react-redux";
import {
  selectUserType,
  selectOfficer,
  selectToken,
  selectRank,
  selectPremissions,
} from "../features/user/stores/userSlice";
import socket from '../services/socket-io'

import axios from "axios";
import * as premissions from "../utils/premissions";
import { useEffect, useState, useRef } from "react";
function Header() {
  const token = useSelector(selectToken);
  const officer = useSelector(selectOfficer);
  const userType = useSelector(selectUserType);
  const rank = useSelector(selectRank);
  const [numOfUnreadWared, setnumOfUnreadWared] = useState("0");
  const [numOfUnreadSader, setnumOfUnreadSader] = useState("0");
  const audioRef = useRef<any>();

  const getNumberOfUnreadWared = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/waredbox/getNumberOfUnreadWared")
        .then((res) => {
          let { data } = res;
          resolve(data);
        })
        .catch(() => {
          reject("0");
        });
    });
  };

  const getNumberOfUnreadSader = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/saderbox/getNumberOfUnreadSader")
        .then((res) => {
          let { data } = res;
          resolve(data);
        })
        .catch(() => {
          reject("0");
        });
    });
  };
  useEffect(() => {
    getNumberOfUnreadWared().then((num: any) => {
      setnumOfUnreadWared(num);
    });
    getNumberOfUnreadSader().then((num: any) => {
      setnumOfUnreadSader(num);
    });
  }, [token]);

  useEffect(() => {
    
    socket
      .off("refetchWaredAndSaderUnreadNumbers")
      .on("refetchWaredAndSaderUnreadNumbers", async () => {
        // console.log("socket event recieved in header");
        let numOfFetchedUnreadWared: any = await getNumberOfUnreadWared();
        let numOfFetchedUnreadSader: any = await getNumberOfUnreadSader();
        if (
          numOfFetchedUnreadWared >= numOfUnreadWared ||
          numOfFetchedUnreadSader >= numOfUnreadSader
        ) {
          audioRef.current.play();
        }
        setnumOfUnreadWared(numOfFetchedUnreadWared);
        setnumOfUnreadSader(numOfFetchedUnreadSader);
      });

    socket
      .off("refetchWaredAndSaderUnreadNumbersNoSound")
      .on("refetchWaredAndSaderUnreadNumbersNoSound", async () => {
        // console.log("socket event recieved in header");
        let numOfFetchedUnreadWared: any = await getNumberOfUnreadWared();
        let numOfFetchedUnreadSader: any = await getNumberOfUnreadSader();
        setnumOfUnreadWared(numOfFetchedUnreadWared);
        setnumOfUnreadSader(numOfFetchedUnreadSader);
      });
    return () => {
      socket.off("refetchWaredAndSaderUnreadNumbersNoSound");
    };
  }, []);

  return (
    <div className=" " key={token}>
      <div className="container mt-4">
        <div className=" fs-2 d-flex justify-content-between fw-bold">
          <div>
            وزارة الدفــــــــــــــــاع
            <br />
            ادارة البحوث الفنية والتطوير
          </div>
          <div>
            <img src="./edaraLogo.png" width={"90px"} />
          </div>
        </div>
      </div>

      <audio src="./notificationSound.mkv" ref={audioRef}></audio>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary mt-3" style={{marginBottom:'0'}}>
        <div className="collapse navbar-collapse container fs-3" id="navbarNav">
          <ul className="navbar-nav ">
            {token && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link active text-white">
                    الصفحة الرئيسية
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/waredbox" className="nav-link active text-white">
                    صندوق الوارد
                    <span style={{ background: "red" }}>
                      {numOfUnreadWared}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/saderbox" className="nav-link active text-white">
                    صندوق الصادر
                    <span style={{ background: "red" }}>
                      {numOfUnreadSader}
                    </span>
                  </Link>
                </li>

                <HasAccessToShowComponent
                  condition={
                    premissions.hasAddWaredPremission() &&
                    premissions.hasAddSaderPremission()
                  }
                >
                  <li className="nav-item dropdown  ">
                    <a
                      className="nav-link dropdown-toggle text-white"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      اضافة مكاتبة
                    </a>
                    <ul
                      className="dropdown-menu fs-3"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <HasAccessToShowComponent
                        condition={premissions.hasAddWaredPremission()}
                      >
                        <li>
                          <Link
                            to="/createwared"
                            className="nav-link active text-dark text-center"
                          >
                            اضافة وارد
                          </Link>
                        </li>
                      </HasAccessToShowComponent>
                      <HasAccessToShowComponent
                        condition={premissions.hasAddSaderPremission()}
                      >
                        <li>
                          <Link
                            to="/createsader"
                            className="nav-link active text-dark text-center"
                          >
                            اضافة صادر
                          </Link>
                        </li>
                      </HasAccessToShowComponent>
                    </ul>
                  </li>
                </HasAccessToShowComponent>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active text-white">
                    تسجيل الدخول
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/register" className="nav-link active text-white">
                    انشاء حساب
                  </Link>
                </li> */}
              </>
            )}
            {token && (
              <li className="nav-item dropdown  ">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {rank + " : " + officer.name}
                </a>
                <ul
                  className="dropdown-menu fs-3"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link active ">
                      تسجيل الخروج
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div
        style={{
          background: "#282c34",
        }}
      ></div>
    </div>
  );
}
export default Header;
