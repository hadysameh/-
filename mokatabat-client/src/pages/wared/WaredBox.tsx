import { SearchBox } from "../../features/wared";
import { WaredTabelTR } from "../../features/wared";
import { useEffect } from "react";
import HorizontalSpinner from "../../components/HorizontalSpinner";
import axios from "axios";
import { useState } from "react";
import { serverApiUrl } from "../../config";

function WaredBox() {
  const [waredBoxRecords, setWaredBoxRecords] = useState<any[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<any>(20);
  const [pageNum, setPageNum] = useState<any>(1);
  const [docNum, setDocNum] = useState("");
  const [docDeptNum, setDocDeptNum] = useState("");
  const [gehaaId, setGehaaId] = useState("");
  const [subject, setsubject] = useState("");
  const [branchId, setBranchId] = useState("");
  const [officerId, setOfficerId] = useState<any>("");
  const [mokatbaDate, setMokatbaDate] = useState("");
  const [DaysBeforeExecution, setDaysBeforeExecution] = useState("7");
  const [isShowSpinner, setIsShowSpinner] = useState(true);
  /*
  0 : بدون حد ادني او اقصى للتنفيذ
  1 : قريبة من الحد الاقصى للتنفي 
  2 : بعيدة عن الحد الاقثى للتنفبذ
  */
  const [withinExcutionTimeType, setWithinExcutionTimeType] = useState("0");

  const fetchSearchResults = () => {
    setIsShowSpinner(true);
    setWaredBoxRecords([]);
    setPageNum(1);
    axios
      .get(serverApiUrl+"api/waredbox/search", {
        params: {
          docNum,
          docDeptNum,
          gehaaId,
          subject,
          branchId,
          officerId,
          mokatbaDate,
          DaysBeforeExecution,
          withinExcutionTimeType,
          pageNum: 0,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          setWaredBoxRecords(res.data);
          setIsShowSpinner(false);
          window.scroll({
            top: 500,
            left: 0,
            behavior: "smooth",
          });
        }
      });
  };
  const fetchRowsWithParams = () => {
    // axios.get("http://localhost:3125/api/waredbox/search", {});
    setIsShowSpinner(true);
    setWaredBoxRecords([]);

    axios
      .get(serverApiUrl+"api/waredbox/search", {
        params: {
          docNum,
          docDeptNum,
          gehaaId,
          subject,
          branchId,
          officerId,
          mokatbaDate,
          DaysBeforeExecution,
          withinExcutionTimeType,
          pageNum: pageNum - 1,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          setIsShowSpinner(false);
          setWaredBoxRecords(res.data);
          window.scroll({
            top: 500,
            left: 0,
            behavior: "smooth",
          });
        }
      });
  };
  const fetchRowsWithNoParams = () => {
    window.scroll(0, 450);
    axios
      .get(serverApiUrl+"api/waredbox/search", {
        params: {
          withinExcutionTimeType: "0",
          pageNum: 0,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          setIsShowSpinner(false);
          setWaredBoxRecords(res.data);
          console.log(res.data.length);
        }
      })
      .catch((err) => console.log({ err }));
  };
  useEffect(() => {
    fetchRowsWithParams();
  }, [pageNum, numOfRecords]);
  return (
    <>
      <div className={"container"} style={{ minHeight: "1000" }}>
        <div className="fs-2 fw-bold">صندوق الوارد</div>
        <SearchBox
          docNum={docNum}
          setDocNum={setDocNum}
          docDeptNum={docDeptNum}
          setDocDeptNum={setDocDeptNum}
          gehaaId={gehaaId}
          setGehaaId={setGehaaId}
          subject={subject}
          setsubject={setsubject}
          branchId={branchId}
          setBranchId={setBranchId}
          officerId={officerId}
          setOfficerId={setOfficerId}
          mokatbaDate={mokatbaDate}
          setMokatbaDate={setMokatbaDate}
          setDaysBeforeExecution={setDaysBeforeExecution}
          DaysBeforeExecution={DaysBeforeExecution}
          withinExcutionTimeType={withinExcutionTimeType}
          setWithinExcutionTimeType={setWithinExcutionTimeType}
          fetchSearchResults={fetchSearchResults}
          fetchRowsWithNoParams={fetchRowsWithNoParams}
        />
        <span className="fs-3">رقم الصفحة :{pageNum}</span>
        <div className="fs-4">
          <label htmlFor="">عدد المكاتبات للصفحة : </label>
          <select
            name=""
            id=""
            onChange={(e) => {
              setNumOfRecords(e.target.value);
            }}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {isShowSpinner ? (
          <HorizontalSpinner />
        ) : (
          <table className="table table-hover fs-4">
            <thead className={"table-dark"}>
              <tr>
                <th scope="col">رقم الوارد</th>
                <th scope="col">رقم الادارة</th>
                <th scope="col" style={{ width: "25%" }}>
                  موضوع المكاتبة
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  تاريخ المكاتبة
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  الضباط المختصين
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  الافرع المختصة
                </th>
                <th scope="col">جهة الوارد</th>
                <th scope="col">الحد الأقصى للتنفيذ</th>
              </tr>
            </thead>
            <tbody>
              {waredBoxRecords.map((row: any, index: number) => {
                return <WaredTabelTR key={index} row={row}></WaredTabelTR>;
              })}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column text-center">
            <span className="fs-3">رقم الصفحة :{pageNum}</span>
            <nav aria-label="Page navigation example" className="fs-4">
              <ul className="pagination">
                {pageNum > 1 && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        setPageNum(pageNum - 1);
                      }}
                    >
                      الصفحة السابقة
                    </button>
                  </li>
                )}
                {waredBoxRecords.length >= numOfRecords && (
                  <li className="page-item">
                    <button
                      className="page-link"
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
      </div>
    </>
  );
}

export default WaredBox;
