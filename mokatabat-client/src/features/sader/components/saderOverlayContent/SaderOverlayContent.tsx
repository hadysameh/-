import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectOfficer } from "../../../user";
interface IProps {
  mokatbaData: any;
}
export default function SaderOverlayContent(props: IProps) {
  const officer = useSelector(selectOfficer);
  const hasOfficerSeenSader = props.mokatbaData.Sadertrackingofficers.find(
    (SaderTrackedfficer: any) => {
      if (SaderTrackedfficer.id === officer.id) {
        return true;
      }
      return false;
    }
  );
  const [mokatbaData, setMokatbaData] = useState<any>();
  const [isMarkedAsRead, setIsMarkAsRead] = useState(!!hasOfficerSeenSader);

  let iframeWaredStyle = {
    width: "90%",
    height: "100vh",
  };
  useEffect(() => {
    console.log({ isMarkedAsRead, hasOfficerSeenSader });
    if (isMarkedAsRead && !hasOfficerSeenSader) {
      axios
        .post("/api/sadertrackingofficers/", {
          saderId: props.mokatbaData.id,
        })
        .then((res) => console.log(res));
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
          <label className="form-check-label display-6"> صادر مقروء</label>
        </div>
        <div className="text-rigth w-100">
          <a href={`/sader/${props.mokatbaData.id}`} target={"_blank"}>
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
