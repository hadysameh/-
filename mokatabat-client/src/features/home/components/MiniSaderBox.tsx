import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/HorizontalSpinner";

function MiniWaredBox() {
  const [isShowSpinner, setIsShowSpinner] = useState(true);
  const [saderBoxRecords, setSaderBoxRecords] = useState([]);
  const [pageNum, setPageNum] = useState<any>(1);

  const fetchWaredRows = () => {
    setIsShowSpinner(true);
    setSaderBoxRecords([]);

    axios
      .get("/api/saderbox/search", {
        params: {
          withinExcutionTimeType: "0",
          pageNum: pageNum - 1,
          numOfRecords: 10,
        },
      })
      .then((res) => {
        if (res.data) {
          let { data } = res;
          // console.log({data})
          setSaderBoxRecords(res.data);
          // setIsShowSpinner(false);
          // window.scrollTo(0, 500);
          setIsShowSpinner(false);
        }
      })
      .catch((err) => console.log({ err }));
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
                رقم الصادر
              </th>
              <th scope="col" style={{ width: "40%" }}>
                الموضوع{" "}
              </th>
              <th scope="col"> الفرع المختص</th>
              <th scope="col" style={{ width: "17%" }}>
                تاريخ الصادر
              </th>
            </tr>
          </thead>
          <tbody>
            {saderBoxRecords.map((saderBoxRecord: any) => {
              return (
                <tr>
                  <th>
                    <a
                      href={`/sader/${saderBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {saderBoxRecord.doc_num}
                    </a>
                  </th>
                  <td>
                    <a
                      href={`/sader/${saderBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {saderBoxRecord.subject}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/sader/${saderBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {saderBoxRecord.branch.name}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`/sader/${saderBoxRecord.id}`}
                      style={aStyle}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {saderBoxRecord.doc_date}
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
            {saderBoxRecords.length >= 10 && (
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
