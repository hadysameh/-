import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser, selectOfficer } from "../../../user/stores/userSlice";
import Overlay from "../../../../components/Overlay/Overlay";
import WaredOverlayContent from "../waredOverlayContent";
// import SingleWaredOverlay from "../waredOverlay/WaredOverlay";
let aStyle = {
  textDecoration: "none",
  color: "#000",
};
// import BranchesAndOfficers from "../branchesAndOfficers";
function WaredTabelTR({ row }: { row: any }) {
  // console.log(row);

  const [isWaredOverlayOpen, setIsWaredOverlayOpen] = useState(false);
  const officer = useSelector(selectOfficer);
  // console.log({ user });
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
      <Overlay
        isOpen={isWaredOverlayOpen}
        setIsWaredOverlayOpen={setIsWaredOverlayOpen}
      >
        <WaredOverlayContent mokatbaData={row} />
      </Overlay>
      <tr
        style={{ background: hasOfficerSeenWared ? "rgb(182 182 182)" : "" }}
        onClick={() => {
          setIsWaredOverlayOpen(true);
        }}
      >
        <td>
          <a
            //href={`/wared/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
              setIsWaredOverlayOpen(true);
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
