import BranchesAndOfficers from "../branchesAndOfficers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectOfficer } from "../../../user";

interface IProps {
  mokatbaData: any;
}
export default function WaredOverlayContent(props: IProps) {
  const officer = useSelector(selectOfficer);
  console.log(props);
  const hasOfficerSeenWared = props.mokatbaData.WaredTrackingOfficers.find(
    (WaredTrackedfficer: any) => {
      if (WaredTrackedfficer.id === officer.id) {
        return true;
      }
      return false;
    }
  );
  const [isMarkedAsRead, setIsMarkAsRead] = useState(!!hasOfficerSeenWared);

  let iframeWaredStyle = {
    width: "90%",
    height: "100vh",
  };
  useEffect(() => {
    if (isMarkedAsRead && !hasOfficerSeenWared) {
      axios
        .post("/api/waredtrackingofficers/", {
          waredId: props.mokatbaData.id,
        })
        .then((res) => console.log("waredtrackingofficers stored"));
    }
  }, [isMarkedAsRead]);
  return (
    <>
      <div
        className="bg-white container d-flex flex-column justify-center"
        style={{
          height: "100%",

          listStyle: "none",
        }}
      >
        <br />
        <h1>نظرة سريعة</h1>
        <div>
          <input
            className="form-check-input display-6 mx-3"
            type="checkbox"
            id="flexCheckDefault"
            onChange={(e) => {
              console.log("setIsMarkAsRead", e.target.value);
              setIsMarkAsRead(!isMarkedAsRead);
            }}
            checked={isMarkedAsRead}
          />
          <label className="form-check-label display-6 mx-3"> وارد مقروء</label>
        </div>
        <BranchesAndOfficers mokatbaData={props.mokatbaData} />
        <div className="text-rigth w-100">
          <a href={`/wared/${props.mokatbaData.id}`} target={"_blank"}>
            الذهاب الى صفحة المكاتبة
          </a>
        </div>
        <hr />

        <div>
          <iframe
            src={`./uploads/${props.mokatbaData?.attach}`}
            style={iframeWaredStyle}
          ></iframe>
        </div>
      </div>
    </>
  );
}
