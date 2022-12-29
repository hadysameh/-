import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectOfficer, selectUser } from "../../../user";
import socket from "../../../../services/socket-io";
import { socketIoEvent } from "../../../../types";
interface IProps {
  saderId: any;
}
export default function SaderOverlayContent(props: IProps) {
  const user = useSelector(selectUser);
  const officer = useSelector(selectOfficer);

  const [mokatbaData, setMokatbaData] = useState<any>();
  const [isMarkedAsRead, setIsMarkAsRead] = useState(false);
  const [hasOfficerSeenSader, setHasOfficerSeenSader] = useState<any>();

  let iframeWaredStyle = {
    width: "90%",
    height: "100vh",
  };
  const fetchSader = () => {
    axios
      .get("/api/onesader", { params: { id: props.saderId } })
      .then((res) => {
        let mokatbaData = res.data;

        const hasOfficerSeenSader = mokatbaData.Sadertrackingofficers.find(
          (Sadertrackingofficer: any) => {

            if (Sadertrackingofficer.id === officer.id) {
              return true;
            }
            return false;
          }
        );
        setHasOfficerSeenSader(hasOfficerSeenSader);
        setIsMarkAsRead(hasOfficerSeenSader);
        setMokatbaData(mokatbaData);
      });
  };
  useEffect(() => {
    socket.on(socketIoEvent.refetchSader, () => {
      fetchSader();
    });
    socket.on(socketIoEvent.refetchSader + user.id, () => {
      fetchSader();
    });
    fetchSader();
  }, []);
  useEffect(() => {
    if (isMarkedAsRead && !hasOfficerSeenSader) {
      axios
        .post("/api/sadertrackingofficers/", {
          saderId: mokatbaData?.id,
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
          <a href={`/sader/${mokatbaData?.id}`} target={"_blank"}>
            الذهاب الى صفحة المكاتبة
          </a>
        </div>
        <hr />

        <div>
          <iframe
            src={`./uploads/${mokatbaData?.attach}`}
            style={iframeWaredStyle}
          ></iframe>
        </div>
      </div>
    </>
  );
}
