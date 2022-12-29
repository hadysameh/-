import { useSelector } from "react-redux";
import { useState } from "react";
import SaderOverlayContent from "../saderOverlayContent";
import Overlay from "../../../../components/Overlay/Overlay";
import { selectUser, selectOfficer } from "../../../user/stores/userSlice";
import isObjEmpty from "../../../../utils/isObjEmpty";
let aStyle = {
  textDecoration: "none",
  color: "#000",
  fontWeight: "bold",
};
function SaderTabelTR({ row ,setOpennedSaderIdInOverlayId}: { row: any; setOpennedSaderIdInOverlayId: any }) {
  const [isSadewrOverlayOpen, setIsSaderOverlayOpen] = useState(false);

  const officer = useSelector(selectOfficer);
  const hasOfficerSeenSader = row.Sadertrackingofficers.find(
    (saderTrackedfficer: any) => {
      if (saderTrackedfficer.id === officer.id) {
        return true;
      }
      return false;
    }
  );

  return (
    <>
       
      <tr
        style={{ background: hasOfficerSeenSader ? "rgb(182 182 182)" : "" }}
        onClick={() => {
          setOpennedSaderIdInOverlayId(row.id)
        }}
      >
        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.doc_num}
          </a>
        </td>
        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.doc_date.replace(/T.*/, "")}
          </a>
        </td>
        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.subject}
          </a>
        </td>
        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.gehaas.map((gehaa: any) => {
              return (
                <>
                  {gehaa.name}
                  <br />
                </>
              );
            })}
          </a>
        </td>
        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.SaderOfficer.name}
          </a>
        </td>

        <td>
          <a
            //href={`/sader/${row.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {row.branch.name}
          </a>
        </td>

        <td>
          <a
            //href={`/wared/${row?.wared?.id}`}
            style={aStyle}
            target={"_blank"}
            onClick={() => {
              setOpennedSaderIdInOverlayId(row.id)
            }}
            rel="noreferrer"
          >
            {!isObjEmpty(row.waredClosedSader)
              ? row.waredClosedSader.map((singleWaredClosedSader: any) => {
                  return (
                    <>
                      <a
                        href={`/waredbox/${singleWaredClosedSader.id}`}
                        target={"_blank"}
                      >
                        {" "}
                        {singleWaredClosedSader.doc_num}
                      </a>
                      <br />
                    </>
                  );
                })
              : "لايوجد"}
          </a>
        </td>

        {/* <td>
        <a //href={`/sader/${row.id}`} style={aStyle} target={"_blank"}
        onClick={() => {
              setIsWaredOverlayOpen(true);
            }} rel="noreferrer">
          {row.gehaa.name}
        </a>
      </td> */}
      </tr>
    </>
  );
}
export { SaderTabelTR };
