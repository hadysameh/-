import BranchesAndOfficers from "../branchesAndOfficers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectOfficer, selectUser } from "../../../user";
import socket from "../../../../services/socket-io";
import { socketIoEvent } from "../../../../types";

interface IProps {
  // mokatbaData: any;
  waredId: any;
}
export default function WaredOverlayContent(props: IProps) {
  const user = useSelector(selectUser);
  const officer = useSelector(selectOfficer);

  const [isMarkedAsRead, setIsMarkAsRead] = useState(false);
  const [mokatbaData, setMokatbaData] = useState<any>();
  const [hasOfficerSeenWared, setHasOfficerSeenWared] = useState<any>();
  let iframeWaredStyle = {
    width: "90%",
    height: "100vh",
  };
  const fetchWared = () => {
    axios.get("/api/wared/", { params: { id: props.waredId } }).then((res) => {
      let mokatbaData = res.data;

      const hasOfficerSeenWared = mokatbaData.WaredTrackingOfficers.find(
        (WaredTrackedfficer: any) => {

          if (WaredTrackedfficer.id === officer.id) {
            return true;
          }
          return false;
        }
      );
      setIsMarkAsRead(hasOfficerSeenWared);
      setHasOfficerSeenWared(hasOfficerSeenWared);
      setMokatbaData(mokatbaData);
    });
  };
  useEffect(() => {
    socket.on(socketIoEvent.refetchWared, () => {
      fetchWared();
    });
    socket.on(socketIoEvent.refetchWared + user.id, () => {
      fetchWared();
    });
    fetchWared();
  }, []);

  useEffect(() => {
    if (isMarkedAsRead && !hasOfficerSeenWared) {
      axios
        .post("/api/waredtrackingofficers/", {
          waredId: props.waredId,
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
              setIsMarkAsRead(!isMarkedAsRead);
            }}
            checked={isMarkedAsRead}
          />
          <label className="form-check-label display-6 mx-3"> وارد مقروء</label>
        </div>
        <div className="fs-3">
          {mokatbaData && <BranchesAndOfficers mokatbaData={mokatbaData} />}
        </div>
        <div className="text-rigth w-100">
          <a href={`/wared/${mokatbaData?.id}`} target={"_blank"}>
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
