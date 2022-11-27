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
    console.log(props);
    return () => {
      if (isMarkedAsRead) {
        axios.post("/api/waredtrackingofficers/", {
          waredId: props.mokatbaData.id,
        })
        .then((res) => console.log('waredtrackingofficers stored'));
      }
    };
  }, []);
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
            className="form-check-input display-6"
            type="checkbox"
            id="flexCheckDefault"
            onChange={() => {
              setIsMarkAsRead(!isMarkedAsRead);
            }}
            checked={isMarkedAsRead}
          />
          <label className="form-check-label display-6"> مكاتبة تمت قرائتها</label>
        </div>
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
