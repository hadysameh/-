import BranchesAndOfficers from "../branchesAndOfficers";
import { useEffect, useState } from "react";
import axios from "axios";
interface IProps {
  mokatbaData: any;
}
export default function WaredOverlayContent(props: IProps) {
  const [mokatbaData, setMokatbaData] = useState<any>();
  let aStyle = {
    // textDecoration: "none",
    // color: "#fff",
    // fontSize: "30px",
  };
  let iframeWaredStyle = {
    width: "90%",
    height: "100vh",
  };
  useEffect(() => {
    // axios.get("/api/wared/", { params: { id: props.waredId } }).then((res) => {
    //   setMokatbaData(res.data);
    // });
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
         
        <div className="text-rigth w-100">
          <a
            href={`/wared/${props.mokatbaData.id}`}
            target={"_blank"}
            style={aStyle}
          >
            الذهاب الى صفحة المكاتبة
          </a>
        </div>
        <hr />

        <div>
          <iframe src={`./uploads/${props.mokatbaData?.attach}`} style={iframeWaredStyle}></iframe>
        </div>
      </div>
    </>
  );
}
