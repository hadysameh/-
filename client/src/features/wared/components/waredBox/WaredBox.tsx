import { SearchBox } from "../searchBox";
import { WaredTabelTR } from "../waredTabelTR";
import { useCallback, useEffect } from "react";
import HorizontalSpinner from "../../../../components/HorizontalSpinner";
import axios from "axios";
import { useState } from "react";
import { waredBoxType, socketIoEvent } from "../../../../types";
import socket from "../../../../services/socket-io";
import { selectUser } from "../../../user/stores/userSlice";
import { useSelector } from "react-redux";
import WaredOverlayContent from "../waredOverlayContent";
import Overlay from "../../../../components/Overlay/Overlay";

interface IProps {
  /**
   *
   */
  waredBoxType: string;
}
function WaredBox(props: IProps) {
  const user = useSelector(selectUser);

  const [waredBoxTypeTitle, setWaredBoxTypeTitle] = useState<string>("");
  const [waredBoxTypeTitleColor, setWaredBoxTypeTitleColor] = useState<string>(
    ""
  );
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
  //TODO this must be fetched from server
  const [DaysBeforeExecution, setDaysBeforeExecution] = useState("0");
  const [isShowSpinner, setIsShowSpinner] = useState(true);
  /*
  0 : بدون حد ادني او اقصى للتنفيذ
  1 : قريبة من الحد الاقصى للتنفي 
  2 : بعيدة عن الحد الاقثى للتنفبذ
  */
  const withinExcutionTimeTypeDefaultValue =
    props.waredBoxType === waredBoxType.normal
      ? "0"
      : props.waredBoxType === waredBoxType.red
      ? "1"
      : "2";

  const [withinExcutionTimeType, setWithinExcutionTimeType] = useState<string>(
    withinExcutionTimeTypeDefaultValue
  );

  const [isWaredOverlayOpen, setIsWaredOverlayOpen] = useState(false);
  const [opennedWaredIdInOverlay, setOpennedWaredIdInOverlayId] = useState<any>(
    ""
  );

  const [isFetchUnreadWared, setIsFetchUnreadWared] = useState(false);

  // const fetchSearchResults = () => {
  //   setIsShowSpinner(true);
  //   setWaredBoxRecords([]);
  //   setPageNum(1);
  //   axios
  //     .get("/api/waredbox/search", {
  //       params: {
  //         docNum,
  //         docDeptNum,
  //         gehaaId,
  //         subject,
  //         branchId,
  //         officerId,
  //         mokatbaDate,
  //         DaysBeforeExecution,
  //         withinExcutionTimeType,
  //         pageNum: 0,
  //         numOfRecords,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data) {
  //         setWaredBoxRecords(res.data);
  //         setIsShowSpinner(false);
  //         window.scroll({
  //           top: 500,
  //           left: 0,
  //           behavior: "smooth",
  //         });
  //       }
  //     });
  // };

  function fetchRowsWithParams() {
    setIsShowSpinner(true);
    setWaredBoxRecords([]);
    console.log("fetchRowsWithParams", {
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
    });
    axios
      .get("/api/waredbox/search", {
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
          unreadWared: isFetchUnreadWared,
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
  }

  const fetchDaysBeforeExecution = () => {
    axios.get("/api/waredoptions/getDaysBeforeExecution").then((res: any) => {
      setDaysBeforeExecution(res.data);
    });
  };
  /**
   *if it's a red circle/green Page default params must have ExcutionTime params
   *
   */
  const fetchRowsWithNoParams = () => {
    window.scroll(0, 450);

    let excutionTimeParams =
      props.waredBoxType !== waredBoxType.normal
        ? { DaysBeforeExecution, withinExcutionTimeType }
        : {};
    // console.log({ excutionTimeParams });
    axios
      .get("/api/waredbox/search", {
        params: {
          withinExcutionTimeType: "0",
          pageNum: 0,
          numOfRecords,
          ...excutionTimeParams,
        },
      })
      .then((res) => {
        if (res.data) {
          setIsShowSpinner(false);
          setWaredBoxRecords(res.data);
          // console.log(res.data.length);
        }
      })
      .catch((err) => console.log({ err }));
  };
  useEffect(() => {
    if (props.waredBoxType === waredBoxType.normal) {
      setWaredBoxTypeTitle("صندوق الوارد");
      setWithinExcutionTimeType("0");
    } else if (props.waredBoxType === waredBoxType.red) {
      setWaredBoxTypeTitle("مكاتبات قريبة من او تجاوزت الحد الاقى للتنفيذ");
      setWaredBoxTypeTitleColor("red");
      setWithinExcutionTimeType("1");
    } else if (props.waredBoxType === waredBoxType.green) {
      setWaredBoxTypeTitle("مكاتبات بعيدة عن الحد الأقصى للتنفيذ");
      setWaredBoxTypeTitleColor("green");
      setWithinExcutionTimeType("2");
    }
    fetchDaysBeforeExecution();
  }, []);

  useEffect(() => {
    fetchRowsWithParams();
  }, [pageNum, numOfRecords]);

  useEffect(() => {
    if (user) {
      socket.on(socketIoEvent.refetchWared, fetchRowsWithParams);
      socket.on(socketIoEvent.refetchWared + user.id, fetchRowsWithParams);
    }
    return () => {
      socket.off(socketIoEvent.refetchWared, fetchRowsWithParams);
      socket.off(socketIoEvent.refetchWared + user.id, fetchRowsWithParams);
    };
  }, [
    docNum,
    docDeptNum,
    gehaaId,
    subject,
    branchId,
    officerId,
    mokatbaDate,
    DaysBeforeExecution,
    withinExcutionTimeType,
    pageNum,
    numOfRecords,
  ]);

  useEffect(() => {
    setIsWaredOverlayOpen(!!opennedWaredIdInOverlay);
  }, [opennedWaredIdInOverlay]);

  useEffect(() => {
    if (!isWaredOverlayOpen) {
      setOpennedWaredIdInOverlayId("");
    }
  }, [isWaredOverlayOpen]);

  return (
    <>
      {isWaredOverlayOpen && (
        <Overlay
          isOpen={isWaredOverlayOpen}
          setIsWaredOverlayOpen={setIsWaredOverlayOpen}
        >
          <WaredOverlayContent waredId={opennedWaredIdInOverlay} />
        </Overlay>
      )}
      <div className={"container"} style={{ minHeight: "1000" }}>
        <div
          className="fs-2 fw-bold"
          style={{
            color: waredBoxTypeTitleColor ? waredBoxTypeTitleColor : "black",
          }}
        >
          {waredBoxTypeTitle}
        </div>
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
          setPageNum={setPageNum}
          isFetchUnreadWared={isFetchUnreadWared}
          setIsFetchUnreadWared={setIsFetchUnreadWared}
          DaysBeforeExecution={DaysBeforeExecution}
          withinExcutionTimeType={withinExcutionTimeType}
          setWithinExcutionTimeType={setWithinExcutionTimeType}
          fetchSearchResults={fetchRowsWithParams}
          fetchRowsWithNoParams={fetchRowsWithNoParams}
          //TODO
          waredBoxType={props.waredBoxType}
        />
        <span className="fs-3">
          رقم الصفحة :
          <input
            type="number"
            className="form-control fs-3 d-inline"
            style={{ width: "50px" }}
            min={1}
            value={pageNum}
            onChange={(e) => {
              setPageNum(e.target.value);
            }}
          />
        </span>
        <div className="fs-4">
          <label htmlFor="">عدد المكاتبات للصفحة : </label>
          <select
            name=""
            id=""
            className="form-select fs-3 d-inline"
            style={{ width: "50px" }}
            onChange={(e) => {
              setNumOfRecords(e.target.value);
            }}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="d-flex my-2">
          <label className="fs-4">مكاتبات تم الإطلاع عليها بالكامل</label>
          <div
            className="bg-secondary mx-2"
            style={{ width: "20px", borderRadius: "5px" }}
          >
            .
          </div>
        </div>
        <hr />

        {isShowSpinner ? (
          <HorizontalSpinner />
        ) : (
          <table className="table table-hover fs-4">
            <thead className={""}>
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
                <th scope="col" style={{ width: "25%" }}>
                  جهة الوارد
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  تاريخ التنفيذ
                </th>
              </tr>
            </thead>
            <tbody>
              {waredBoxRecords.map((row: any, index: number) => {
                return (
                  <WaredTabelTR
                    key={row.id}
                    row={row}
                    DaysBeforeExecution={DaysBeforeExecution}
                    setOpennedWaredInOverlayId={setOpennedWaredIdInOverlayId}
                  ></WaredTabelTR>
                );
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
                {waredBoxRecords.length >= numOfRecords && (
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
    </>
  );
}

export { WaredBox };
