import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircleSpinner from "../../components/CircleSpinner";
import { serverApiUrl } from "../../config";
import BranchesAndOfficers from "../../features/wared/components/branchesAndOfficersSelect";
import * as premissions from "../../utils/premissions";
import HasAccessToShowComponent from "../../middlewares/componentsGaurds/HasAccessToShowComponent";
function MokatbaDetailsPreview() {
  let navigate = useNavigate();

  let { mokatbaId } = useParams();
  const [mokatbaData, setMokatbaData] = useState<any>({});
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const deleteWared = useCallback(() => {
    axios
      .delete(serverApiUrl + "api/waredbox/deletewared", {
        data: { waredId: mokatbaId },
      })
      .then((res) => {
        navigate("/waredbox");
      });
  }, []);
  useEffect(() => {
    // console.log("will fetch");
    axios
      .get(serverApiUrl + "api/wared/", { params: { id: mokatbaId } })
      .then((res) => {
        setMokatbaData(res.data);
      });

    axios
      .post(serverApiUrl + "api/waredtrackingofficers/", {
        waredId: mokatbaId,
      })
      .then((res) => console.log(res));
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
                    {mokatbaData.doc_num ? (
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
                    {mokatbaData.doc_dept_num ? (
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
                  {mokatbaData.doc_date ? (
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
                  {mokatbaData.subject ? (
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
                  {mokatbaData.gehaa ? (
                    mokatbaData.gehaa.name
                  ) : (
                    <CircleSpinner />
                  )}
                </span>
              </div>
            </div>

            {mokatbaData.branches && mokatbaData.Wared_Officers && (
              <BranchesAndOfficers
                mokatbaData={mokatbaData}
                selectedBranches={mokatbaData.branches}
                selectedOfficers={mokatbaData.Wared_Officers}
              />
            )}

            <div className="row align-items-start pt-5">
              <div className="">
                اخر معاد للتنفيذ:
                <span className="px-3 text-secondary">
                  {mokatbaData.docDeadline
                    ? mokatbaData.docDeadline
                    : "غير محدد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                رقم صادر اغلاق المكاتبة
                <span className="px-3 text-secondary">
                  {mokatbaData.closedSader_id
                    ? mokatbaData.closedSader_id
                    : "لايوجد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                حالة الحد الاقصى للمكاتبة
                <span className="px-3 text-secondary">
                  {mokatbaData.docDeadline && mokatbaData.known == 0
                    ? "مفتوحة"
                    : "غير محدد"}
                </span>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                تاريخ تسجيل الماكتبة :
                <span className="px-3 text-secondary">
                  {mokatbaData.register_date ? (
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
                  href={`${serverApiUrl}uploads/${mokatbaData.attach}`}
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
                      onClick={() => {
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
                        onClick={() => {
                          deleteWared();
                        }}
                        target="blank"
                        className="btn btn-lg btn-danger fs-3 ml-3"
                      >
                        تأكيد حذف الوارد
                      </a>

                      <a
                        onClick={() => {
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
