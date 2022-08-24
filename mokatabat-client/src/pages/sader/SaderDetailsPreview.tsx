import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CircleSpinner from "../../components/CircleSpinner";
import { serverApiUrl } from "../../config";
import HasAccessToShowComponent from "../../middlewares/componentsGaurds/HasAccessToShowComponent";
import * as premissions from "../../utils/premissions";

function SaderDetailsPreview() {
  let navigate = useNavigate();

  let { saderId } = useParams();
  const [saderData, setSaderData] = useState<any>({});
  const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false);
  const deleteSader = useCallback(() => {
    axios
      .delete(serverApiUrl + "api/saderbox/deletesader", { data: { saderId } })
      .then((res) => {
        navigate("/saderbox");
      });
  }, []);
  useEffect(() => {
    axios
      .get(serverApiUrl + "api/onesader", { params: { id: saderId } })
      .then((res) => {
        console.log({ data: res.data });
        setSaderData(res.data);
      });
    axios
      .post(serverApiUrl + "api/sadertrackingofficers/", {
        saderId,
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
                          <li className="text-secondary">{officer.name}</li>
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
                متصلة بوراد:
                <span className="px-3 text-secondary">
                  {saderData.wared ? (
                    <a href={`/wared/${saderData?.wared?.id}`} target="blank">
                      {saderData?.wared?.doc_num}
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
                  href={`http://localhost:3125/uploads/${saderData.attach}`}
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
                      onClick={() => {
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
                        onClick={() => {
                          deleteSader();
                        }}
                        target="blank"
                        className="btn btn-lg btn-danger fs-3 ml-3"
                      >
                        تأكيد حذف الصادر
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
export default SaderDetailsPreview;
