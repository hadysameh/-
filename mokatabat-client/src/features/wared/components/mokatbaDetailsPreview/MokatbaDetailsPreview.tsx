import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CircleSpinner from "../../../../components/CircleSpinner";
import { serverApiUrl } from "../../../../config";
function MokatbaDetailsPreview() {
  let { mokatbaId } = useParams();
  const [mokatbaData, setMokatbaData] = useState<any>({});
  useEffect(() => {
    // console.log("will fetch");
    axios
      .get(serverApiUrl + "api/wared/", { params: { id: mokatbaId } })
      .then((res) => {
        console.log(res.data);
        setMokatbaData(res.data);
      });
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
            <div className="row align-items-start pt-5">
              <div className="">
                الضباط المختصين:
                <div style={{ paddingRight: "20px" }}>
                  <ul>
                    {mokatbaData.Wared_Officers &&
                    mokatbaData.Wared_Officers.length > 0
                      ? mokatbaData.Wared_Officers.map((officer: any) => {
                          return (
                            <li className="text-secondary">{officer.name}</li>
                          );
                        })
                      : "غير محدد"}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row align-items-start pt-5">
              <div className="">
                الأفرع المختصة
                <div style={{ paddingRight: "20px" }}>
                  <ul>
                    {mokatbaData.branches
                      ? mokatbaData.branches.map((branche: any) => {
                          return (
                            <li className="text-secondary">{branche.name}</li>
                          );
                        })
                      : "غير محدد"}
                  </ul>
                </div>
              </div>
            </div>
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

            <div className="row align-items-start pt-5">
              <div className="">
                <Link
                  to={`/wared/edit/${mokatbaId}`}
                  style={{
                    marginBottom: "50px",
                  }}
                  className="btn btn-lg btn-success fs-3"
                >
                  تعديل المكاتبة
                </Link>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export { MokatbaDetailsPreview };
