import { useEffect, useState } from "react";
import axios from "axios";
interface IProps {
  mokatbaData: any;
}
export default function SaderOverlayContent(props: IProps) {
  const [mokatbaData, setMokatbaData] = useState<any>();
  let aStyle = {
    // textDecoration: "none",
    // color: "#fff",
    // fontSize: "30px",
  };
  let iframeWaredStyle = {
    width: "70vw",
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
        <h1>ملخص المكاتبة</h1>
        <div className="row align-items-start pt-5 mx-3">
          <div className="text-right container">
            <div>
              الضابط المختص:
              <ul>{props.mokatbaData.SaderOfficer?.name}</ul>
            </div>
          </div>
        </div>
        <div className="row align-items-start pt-5 mx-3">
          <div className="text-right container">
            الفرع المختص
            <ul>{props.mokatbaData.branch?.name}</ul>
          </div>
        </div>
        <div className="text-rigth w-100">
          <a
            href={`/sader/${props.mokatbaData.id}`}
            target={"_blank"}
            style={aStyle}
          >
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
