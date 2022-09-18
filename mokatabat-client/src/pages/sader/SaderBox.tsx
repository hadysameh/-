import { useEffect, useState } from "react";
import { SaderTabelTR } from "../../features/sader/components/saderTabelTr";
import { SearchBox } from "../../features/sader/components/searchBox";
import axios from "axios";
import Spinner from "../../components/HorizontalSpinner";
import { io } from "socket.io-client";

function SaderBox() {
  const [saderBoxRecords, setSaderBoxRecords] = useState<any[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<any>(20);
  const [pageNum, setPageNum] = useState<any>(1);
  const [searchPageNum, setSearchPageNum] = useState<any>(1);

  const [docNum, setDocNum] = useState("");
  const [lastWaredNum, setLastWaredNum] = useState("");
  const [gehaaId, setGehaaId] = useState("");
  const [subject, setsubject] = useState("");
  const [branchId, setBranchId] = useState("");
  const [officerId, setOfficerId] = useState<any>("");
  const [mokatbaDate, setMokatbaDate] = useState("");
  const [isShowSpinner, setIsShowSpinner] = useState(true);

  /*
  0 : بدون حد ادني او اقصى للتنفيذ
  1 : قريبة من الحد الاقصى للتنفي 
  2 : بعيدة عن الحد الاقثى للتنفبذ
  */
  const fetchSearchResults = () => {
    setIsShowSpinner(true);
    setSaderBoxRecords([]);
    setPageNum(1);
    axios
      .get("/api/saderbox/search", {
        params: {
          docNum,
          gehaaId,
          lastWaredNum,
          subject,
          branchId,
          officerId,
          mokatbaDate,
          //we are making pageNum == 0 because db skip
          pageNum: 0,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log({ data: res.data });
          setSaderBoxRecords(res.data);
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
    // window.scroll(0, 450);

    setIsShowSpinner(true);
    setSaderBoxRecords([]);

    axios
      .get("/api/saderbox/search", {
        params: {
          docNum,
          gehaaId,
          lastWaredNum,
          subject,
          branchId,
          officerId,
          mokatbaDate,
          pageNum: pageNum - 1,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          setSaderBoxRecords(res.data);
          setIsShowSpinner(false);
          window.scroll({
            top: 500,
            left: 0,
            behavior: "smooth",
          });
        }
      });
  };
  const fetchRowsWithNoParams = () => {
    // window.scrollTo(0, 500);
    window.scroll({
      top: 500,
      left: 0,
      behavior: "smooth",
    });
    // setIsShowSpinner(true);
    // window.scroll(0, 450);
    axios
      .get("/api/saderbox/search", {
        params: {
          withinExcutionTimeType: "0",
          pageNum: 0,
          numOfRecords,
        },
      })
      .then((res) => {
        if (res.data) {
          setSaderBoxRecords(res.data);
          // setIsShowSpinner(false);
          // window.scrollTo(0, 500);
          setIsShowSpinner(false);
        }
      })
      .catch((err) => console.log({ err }));
  };
  useEffect(() => {
    fetchRowsWithParams();
  }, [pageNum, numOfRecords]);

  useEffect(() => {
    const socket = io('/');
    socket
      .off("refetchWaredAndSaderUnreadNumbers")
      .on("refetchWaredAndSaderUnreadNumbers", () => {
        fetchRowsWithParams();
      });
    socket
      .off("refetchWaredAndSaderUnreadNumbersNoSound")
      .on("refetchWaredAndSaderUnreadNumbersNoSound", () => {
        fetchRowsWithParams();
      });
    return () => {
      socket.off("refetchWaredAndSaderUnreadNumbers");
      socket.off("refetchWaredAndSaderUnreadNumbersNoSound");
    };
  }, []);
  return (
    <div className={"container"} style={{ minHeight: "1000" }}>
      <div className="fs-2 fw-bold">صندوق الصادر</div>
      <SearchBox
        docNum={docNum}
        setDocNum={setDocNum}
        gehaaId={gehaaId}
        setGehaaId={setGehaaId}
        subject={subject}
        setsubject={setsubject}
        branchId={branchId}
        setBranchId={setBranchId}
        officerId={officerId}
        setOfficerId={setOfficerId}
        mokatbaDate={mokatbaDate}
        lastWaredId={lastWaredNum}
        setLastWaredNum={setLastWaredNum}
        setMokatbaDate={setMokatbaDate}
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
        <Spinner />
      ) : (
        <table className="table table-hover fs-4">
          <thead className={"table-dark"}>
            <tr>
              <th scope="col">رقم الصادر</th>
              <th scope="col" style={{ width: "10%" }}>
                تاريخ الصادر
              </th>
              <th scope="col" style={{ width: "25%" }}>
                موضوع الصادر
              </th>
              <th scope="col">جهة الصادر</th>

              <th scope="col" style={{ width: "15%" }}>
                الضابط المختص
              </th>
              <th scope="col" style={{ width: "15%" }}>
                الفرع المختص
              </th>

              {/* <th scope="col">الإتجاه المختص</th> */}
              {/* <th scope="col">الضابط المختص</th> */}
              <th scope="col">متصلة بوارد</th>
              {/* <th scope="col">متصلة بوارد</th> */}
            </tr>
          </thead>
          <tbody>
            {saderBoxRecords.map((row: any) => {
              return <SaderTabelTR row={row}></SaderTabelTR>;
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
                    className="page-link fs-3"
                    onClick={() => {
                      setPageNum(pageNum - 1);
                    }}
                  >
                    الصفحة السابقة
                  </button>
                </li>
              )}
              {saderBoxRecords.length >= numOfRecords && (
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
    </div>
  );
}
export default SaderBox;
