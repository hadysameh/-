import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircleSpinner from "../../components/CircleSpinner";
import HasAccessToShowComponent from "../../middlewares/componentsGaurds/HasAccessToShowComponent";
import * as premissions from "../../utils/premissions";
import socket from "../../services/socket-io";
import { socketIoEvent } from "../../types";
import { selectUser } from "../../features/user/stores/userSlice";
import { useSelector } from "react-redux";

function SaderDetailsPreview() {
  let navigate = useNavigate();
  const user = useSelector(selectUser);

  let { saderId } = useParams();
  const [saderData, setSaderData] = useState<any>({});
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const deleteSader = useCallback(() => {
    axios
      .delete("/api/saderbox/deletesader", { data: { saderId } })
      .then((res) => {
        navigate("/saderbox");
      });
  }, []);

  const getAndSetSaderData = () => {
    axios.get("/api/onesader", { params: { id: saderId } }).then((res) => {
      console.log({ data: res.data });
      setSaderData(res.data);
    });
  };
  useEffect(() => {
    axios
      .post("/api/sadertrackingofficers/", {
        saderId,
      })
      .then((res) => console.log(res));

    getAndSetSaderData();
  }, []);

  useEffect(() => {
    if (user) {
      socket.on(socketIoEvent.refetchSader, () => {
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      });
    }

    return () => {};
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  return (
    <>
      <div className="container fs-3 ">
        <div
          className="border-start border-end p-4"
          style={{ height: "100vh" }}
        >
          <div className="row align-items-start my-3">
            <div className="row align-items-start ">
              <div className="col-6">
                <div className="">
                  رقم الصادر:
                  <span className="px-3 text-secondary">
                    {saderData.doc_num ? saderData.doc_num : <CircleSpinner />}
                  </span>
                </div>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                تاريخ الماكتبة :
                <span className="px-3 text-secondary">
                  {saderData.doc_date ? (
                    saderData.doc_date.replace(/T.*/, "")
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الموضوع:
                <span className="px-3 text-secondary">
                  {saderData.subject ? saderData.subject : <CircleSpinner />}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الجهة:
                <div style={{ paddingRight: "20px" }}>
                  <ul>
                    {saderData.gehaas && saderData.gehaas.length > 0 ? (
                      saderData.gehaas.map((officer: any) => {
                        return (
                          <li
                            className="text-secondary"
                            key={JSON.stringify(officer.name)}
                          >
                            {officer.name}
                          </li>
                        );
                      })
                    ) : (
                      <CircleSpinner />
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الضابط المختص:
                <ul>{saderData.SaderOfficer?.name}</ul>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الفرع المختص
                <ul>
                  {saderData.branch ? saderData.branch.name : <CircleSpinner />}
                </ul>
              </div>
            </div>

            <div className="row align-items-start pt-5">
              <div className="">
                تاريخ تسجيل الماكتبة :
                <span className="px-3 text-secondary">
                  {saderData.register_date ? (
                    saderData.register_date.replace(/T.*/, "")
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                وارد وجوب رد:
                <span className="px-3 text-secondary">
                  {saderData.waredClosedSader?.length
                    ? saderData?.waredClosedSader?.map(
                        (waredClosedSaderElement: any) => (
                          <div>
                            {" "}
                            <a
                              href={`/wared/${waredClosedSaderElement?.id}`}
                              target="blank"
                            >
                              {waredClosedSaderElement.doc_num}
                            </a>
                          </div>
                        )
                      )
                    : "لا يوجد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                ايماءً الى وارد رقم:
                <span className="px-3 text-secondary">
                  {saderData.lastWared?.id ? (
                    <a
                      href={`/wared/${saderData.lastWared?.id}`}
                      target="blank"
                    >
                      {saderData.lastWared.doc_num}
                    </a>
                  ) : (
                    "لا يوجد"
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الحاقاً الى صادر رقم:
                <span className="px-3 text-secondary">
                  {saderData.lastWared?.id ? (
                    <a
                      href={`/sader/${saderData.lastSader?.id}`}
                      target="blank"
                    >
                      {saderData.lastSader.doc_num}
                    </a>
                  ) : (
                    "لا يوجد"
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                <a
                  href={`./uploads/${saderData?.attach}`}
                  target="blank"
                  className="btn btn-lg btn-primary fs-3"
                >
                  عرض الصادر
                </a>
              </div>
            </div>

            <HasAccessToShowComponent
              condition={premissions.hasEditWaredPremission()}
            >
              <div className="row align-items-start pt-5">
                <div className="">
                  <Link
                    to={`/sader/edit/${saderId}`}
                    className="btn btn-lg btn-success fs-3"
                  >
                    تعديل الصادر
                  </Link>
                  <br />
                </div>
              </div>
            </HasAccessToShowComponent>

            <HasAccessToShowComponent
              condition={premissions.hasDeleteSaderPremission()}
            >
              <>
                <div className="row align-items-start pt-5">
                  <div className="">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsConfirmDeleteShown(true);
                      }}
                      target="blank"
                      className="btn btn-lg btn-danger fs-3"
                    >
                      حذف الصادر
                    </a>
                  </div>
                </div>

                {isConfirmDeleteShown && (
                  <div className="row align-items-start pt-5">
                    <div className="d">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteSader();
                        }}
                        target="blank"
                        className="btn btn-lg btn-danger fs-3 ml-3"
                      >
                        تأكيد حذف الصادر
                      </a>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsConfirmDeleteShown(false);
                        }}
                        target="blank"
                        className="btn btn-lg btn-success fs-3 mr-3"
                      >
                        إالغاء
                      </a>
                    </div>
                  </div>
                )}
              </>
            </HasAccessToShowComponent>
          </div>
        </div>
      </div>
    </>
  );
}
export default SaderDetailsPreview;
