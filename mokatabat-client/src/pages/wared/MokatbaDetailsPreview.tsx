import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircleSpinner from "../../components/CircleSpinner";
import BranchesAndOfficers from "../../features/wared/components/branchesAndOfficers";
import * as premissions from "../../utils/premissions";
import HasAccessToShowComponent from "../../middlewares/componentsGaurds/HasAccessToShowComponent";
import socket from "../../services/socket-io";
import { socketIoEvent } from "../../types";
import { selectUser } from "../../features/user/stores/userSlice";
import { useSelector } from "react-redux";
function MokatbaDetailsPreview() {
  const user = useSelector(selectUser);

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  let navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  let { mokatbaId } = useParams();
  const [mokatbaData, setMokatbaData] = useState<any>({});
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const deleteWared = useCallback(() => {
    axios
      .delete("/api/waredbox/deletewared", {
        data: { waredId: mokatbaId },
      })
      .then((res) => {
        navigate("/waredbox");
      });
  }, []);
  const getAndSetMokatbaData = () => {
    axios.get("/api/wared/", { params: { id: mokatbaId } }).then((res) => {
      console.log({mokatbadata:res})
      setMokatbaData(res.data);
    });
  };
  useEffect(() => {
    getAndSetMokatbaData();
    axios
      .post("/api/waredtrackingofficers/", {
        waredId: mokatbaId,
      })
      .then((res) => console.log(res));
  }, []);

  useEffect(() => {
    socket.on(socketIoEvent.refetchWared, () => {
      window.location.reload();
    });
    // socket.on(socketIoEvent.refetchWared + user.id, () => {
    //   window.location.reload();
    // });

    return () => {};
  }, []);

  return (
    <>
      <div className="container fs-3 ">
        <div
          className="border-start border-end p-4"
          style={{ height: "100vh" }}
        >
          <div className="row align-items-start ">
            <div className="row align-items-start ">
              <div className="col-6">
                <div className="">
                  رقم الوارد:
                  <span className="px-3 text-secondary">
                    {mokatbaData?.doc_num ? (
                      mokatbaData.doc_num
                    ) : (
                      <CircleSpinner />
                    )}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  رقم الإدارة:
                  <span className="px-3 text-secondary">
                    {mokatbaData?.doc_dept_num ? (
                      mokatbaData.doc_dept_num
                    ) : (
                      <CircleSpinner />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                تاريخ الماكتبة :
                <span className="px-3 text-secondary">
                  {mokatbaData?.doc_date ? (
                    mokatbaData.doc_date.replace(/T.*/, "")
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
                  {mokatbaData?.subject ? (
                    mokatbaData.subject
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الجهة:
                <span className="px-3 text-secondary">
                  {mokatbaData?.gehaa ? (
                    mokatbaData.gehaa.name
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>

            {mokatbaData?.branches && mokatbaData.Wared_Officers && (
              <BranchesAndOfficers mokatbaData={mokatbaData} />
            )}

            <div className="row align-items-start pt-5">
              <div className="">
                اخر معاد للتنفيذ:
                <span className="px-3 text-secondary">
                  {mokatbaData?.docDeadline
                    ? mokatbaData.docDeadline
                    : "غير محدد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                رقم صادر اغلاق المكاتبة
                <span className="px-3 text-secondary">
                  {mokatbaData?.closedSader_id
                    ? mokatbaData.closedSader_id
                    : "لايوجد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                حالة الحد الاقصى للمكاتبة
                <span className="px-3 text-secondary">
                  {mokatbaData?.docDeadline && mokatbaData.known == 0
                    ? "مفتوحة"
                    : "غير محدد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                تاريخ تسجيل الماكتبة :
                <span className="px-3 text-secondary">
                  {mokatbaData?.register_date ? (
                    mokatbaData.register_date.replace(/T.*/, "")
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                <a
                  href={`./uploads/${mokatbaData?.attach}`}
                  target="blank"
                  className="btn btn-lg btn-primary fs-3"
                >
                  عرض المكاتبة
                </a>
              </div>
            </div>
            <HasAccessToShowComponent
              condition={premissions.hasEditWaredPremission()}
            >
              <div className="row align-items-start pt-5">
                <div className="">
                  <Link
                    to={`/wared/edit/${mokatbaId}`}
                    className="btn btn-lg btn-success fs-3"
                  >
                    تعديل المكاتبة
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
                      حذف الوارد
                    </a>
                  </div>
                </div>

                {isConfirmDeleteShown && (
                  <div className="row align-items-start pt-5">
                    <div className="d">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          deleteWared();
                        }}
                        href="#"
                        target="blank"
                        className="btn btn-lg btn-danger fs-3 ml-3"
                      >
                        تأكيد حذف الوارد
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
export default MokatbaDetailsPreview;
