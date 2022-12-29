import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser, selectOfficer } from "../../../user/stores/userSlice";
import Overlay from "../../../../components/Overlay/Overlay";
import WaredOverlayContent from "../waredOverlayContent";
import addDaysToDate from "../../../../helpers/addDaysToDate";
import getTodaysDate from "../../../../helpers/getTodaysDate";

function WaredTabelTR({
  row,
  DaysBeforeExecution,
  setOpennedWaredInOverlayId
}: {
  row: any;
  DaysBeforeExecution: string;
  setOpennedWaredInOverlayId:any
}) {
  const dateWithoutDaysBeforeExecution = addDaysToDate(
    row.docDeadline,
    -DaysBeforeExecution
  );
  const isMokatbaInRedBox =
    row.known == "0" && row.docDeadline&&dateWithoutDaysBeforeExecution <= getTodaysDate();

  const isMokatbaInGreenBox =
    row.known == "0" && dateWithoutDaysBeforeExecution > getTodaysDate();
  const rowTextColor = isMokatbaInRedBox
    ? "#bb2d3b"
    : isMokatbaInGreenBox
    ? "green"
    : "black";

  let aStyle = {
    textDecoration: "none",
    color: rowTextColor,
    fontWeight: "bold",
  };
  const officer = useSelector(selectOfficer);
  const hasOfficerSeenWared = row.WaredTrackingOfficers.find(
    (WaredTrackedfficer: any) => {
      if (WaredTrackedfficer.id === officer.id) {
        return true;
      }
      return false;
    }
  );
  return (
    <>
      {/* {isWaredOverlayOpen && (
        <Overlay
          isOpen={isWaredOverlayOpen}
          setIsWaredOverlayOpen={setIsWaredOverlayOpen}
        >
          <WaredOverlayContent mokatbaData={row} />
        </Overlay>
      )} */}
      <tr
        style={{
          background: hasOfficerSeenWared ? "rgb(182 182 182)" : "",
          color: rowTextColor,
        }}
        onClick={() => {
          setOpennedWaredInOverlayId(row.id)
        }}
      >
        <td>
          <a
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.doc_num}
          </a>
        </td>
        <td>
          <a
            //href={`/wared/${row.id}`}
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.doc_dept_num}
          </a>
        </td>
        <td>
          <a
            //href={`/wared/${row.id}`}
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.subject}
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.doc_date?.replace(/T.*/, "")}
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.Wared_Officers?.map((officer: any) => {
              return (
                <>
                  {officer.name}
                  <br />
                </>
              );
            })}
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.branches?.map((branch: any) => {
              return (
                <>
                  {branch.name}
                  <br />
                </>
              );
            })}
          </a>
        </td>

        <td>
          <a
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.gehaa?.name}
          </a>
        </td>
        <td>
          <a
            onClick={() => {
              setOpennedWaredInOverlayId(row.id)
            }}
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            rel="noreferrer"
          >
            {row.docDeadline ? row.docDeadline.replace(/T.*/, "") : "لا يوجد"}
          </a>
        </td>
      </tr>
    </>
  );
}
export { WaredTabelTR };
