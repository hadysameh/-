import BranchesAndOfficers from "../branchesAndOfficers";
import { useEffect, useState } from "react";
import axios from "axios";
interface IProps {
  mokatbaData: any;
}
export default function WaredOverlayContent(props: IProps) {
  const [mokatbaData, setMokatbaData] = useState<any>();
  let aStyle = {
    textDecoration: "none",
    color: "#fff",
    fontSize:'30px'
  };
  let iframeWaredStyle={
    width:'70vw',
    height:'100vh',
  }
  useEffect(() => {
    // axios.get("/api/wared/", { params: { id: props.waredId } }).then((res) => {
    //   setMokatbaData(res.data);
    // });
  }, []);
  return (
    <>
      {/* <BranchesAndOfficers
        mokatbaData={props.mokatbaData}
      ></BranchesAndOfficers> */}
      <div className="text-rigth">
        <a
          href={`/wared/${props.mokatbaData.id}`}
          target={"_blank"}
          style={aStyle}
           
        >
          الذهاب الى صفحة المكاتبة
        </a>
      </div>
      <div className="container">
        {/* <iframe src={`./uploads/${props.mokatbaData?.attach}`} style={iframeWaredStyle}></iframe> */}
      </div>
    </>
  );
}
