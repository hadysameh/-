import { Link } from "react-router-dom";
import HideIfAuth from "../middlewares/componentsGaurds/HideIfAuth";
import HideIfNotAuth from "../middlewares/componentsGaurds/HideIfNotAuth";
import { useSelector } from "react-redux";
import { selectToken, selectOfficer } from "../features/user/stores/userSlice";
import { useEffect } from "react";
function Header() {
  const token = useSelector(selectToken);
  const officer = useSelector(selectOfficer);
  useEffect(() => {
    console.log({ tokenFromHeader: token });
  }, [token]);
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

      <nav className="navbar navbar-expand-lg navbar-light bg-primary mt-3">
        <div className="collapse navbar-collapse container fs-3" id="navbarNav">
          <ul className="navbar-nav ">
            <HideIfNotAuth>
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link active text-white">
                    الصفحة الرئيسية
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/waredbox" className="nav-link active text-white">
                    صندوق الوارد
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/saderbox" className="nav-link active text-white">
                    صندوق الصادر
                  </Link>
                </li>

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
                    <li>
                      <Link
                        to="/createwared"
                        className="nav-link active text-dark text-center"
                      >
                        اضافة وارد
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/createsader"
                        className="nav-link active text-dark text-center"
                      >
                        اضافة صادر
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            </HideIfNotAuth>
            <HideIfAuth>
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
            </HideIfAuth>
            <HideIfNotAuth>
              <li className="nav-item dropdown  ">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {officer.name}
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
            </HideIfNotAuth>
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
