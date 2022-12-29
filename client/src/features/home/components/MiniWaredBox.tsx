import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/HorizontalSpinner";
function MiniWaredBox() {
  const [isShowSpinner, setIsShowSpinner] = useState(true);
  const [waredBoxRecords, setWaredBoxRecords] = useState([]);
  const [pageNum, setPageNum] = useState<any>(1);

  const fetchWaredRows = () => {
    // axios.get("http://localhost:3125/api/waredbox/search", {});
    setIsShowSpinner(true);
    setWaredBoxRecords([]);

    axios
      .get("/api/waredbox/search", {
        params: {
          withinExcutionTimeType: "0",
          pageNum: pageNum - 1,
          numOfRecords: 10,
        },
      })
      .then((res) => {
        if (res.data) {
          let { data } = res;
          setIsShowSpinner(false);
          setWaredBoxRecords(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchWaredRows();
  }, [pageNum]);
  let aStyle = {
    textDecoration: "none",
    color: "#000",
  };
  return (
    <div dir="rtl">
      {}
      {isShowSpinner ? (
        <Spinner />
      ) : (
        <table className="table fs-4">
          <thead className="">
            <tr>
              <th scope="col" style={{ width: "17%" }}>
                رقم الوارد
              </th>
              <th scope="col" style={{ width: "40%" }}>
                الموضوع{" "}
              </th>
              <th scope="col">جهة الوارد</th>
              <th scope="col" style={{ width: "17%" }}>
                تاريخ الوارد
              </th>
            </tr>
          </thead>
          <tbody>
            {waredBoxRecords.map((waredBoxRecord: any, index: number) => {
              return (
                <tr key={index + waredBoxRecord.id}>
                  <th>
                    <a
                      href={`/wared/${waredBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {waredBoxRecord.doc_num}
                    </a>
                  </th>
                  <td>
                    <a
                      href={`/wared/${waredBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {waredBoxRecord.subject}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/wared/${waredBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {waredBoxRecord.gehaa.name}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/wared/${waredBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {waredBoxRecord.doc_date}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-center align-items-center">
        <nav aria-label="Page navigation example" className="fs-4">
          <ul className="pagination">
            {pageNum > 1 && (
              <li className="page-item">
                <button
                  className="page-link fs-3"
                  onClick={() => {
                    setPageNum(pageNum - 1);
                  }}
                >
                  الصفحة السابقة
                </button>
              </li>
            )}
            {waredBoxRecords.length >= 10 && (
              <li className="page-item">
                <button
                  className="page-link fs-3"
                  onClick={() => {
                    setPageNum(pageNum + 1);
                  }}
                >
                  الصفحةالتالية
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default MiniWaredBox;
