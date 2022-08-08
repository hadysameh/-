import logo from "../../logo.svg";
import Circle from "./components/Circle";
import MiniSaderBox from "./components/MiniSaderBox";
import MiniWaredBox from "./components/MiniWaredBox";
import { useEffect, useState } from "react";
import { serverApiUrl } from "../../config";

import axios from "axios";
function Home() {
  const [waredCount, setWaredCount] = useState(0);
  const [saderCount, setSaderCount] = useState(0);
  const [redCircleCount, setRedCircleCount] = useState(0);
  const [greenCircleCount, setGreenCircleCount] = useState(0);
  useEffect(() => {
    axios.get(serverApiUrl + "api/home").then((res) => {
      let { data } = res;
      // console.log({ data });
      setWaredCount(Number(data.waredCount));
      setSaderCount(Number(data.saderCount));
      setRedCircleCount(Number(data.redCircleCount));
      setGreenCircleCount(Number(data.greenCircleCount));
    });
  }, []);
  const circleBoxStyle = {
    // width: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    borderWidth: "1px",
    margin: "10px",
    padding: "30px",
    // background: "#f8f8f8",
    border: "2px",
    borderStyle: "solid",
    borderColor: "#b6b8c3",
    borderRadius: "10px",
    boxShadow: "1px 1px #b6b8c3",
  };
  const mokatbaBoxStyle = {
    width: "50%",
  };
  return (
    <div className="container" dir="ltr">
      <div
        className="fs-3"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {/* red and green circles div */}
        <div className="cared" style={{ ...circleBoxStyle, width: "40%" }}>
          <Circle
            backGroundColor="rgb(28 187 55 / 78%)"
            textUnderCircle="بعيدة عن الحد الأقصى"
            textInCircle={String(greenCircleCount)}
            link="/greencircle"
          />

          <Circle
            backGroundColor="#d4203fc7"
            textUnderCircle="قريبة من او تجاوزت الحد الأقصى"
            textInCircle={String(redCircleCount)}
            link="/redcircle"
          />
        </div>

        <div style={{ ...circleBoxStyle, width: "60%" }}>
          <Circle
            backGroundColor="#fff"
            textUnderCircle="مكاتبات الوارد"
            textInCircle={String(waredCount)}
            textInCirlceColor="black"
            link="/waredbox"
          />

          <Circle
            backGroundColor="#fff"
            textUnderCircle="مكاتبات الصادر"
            textInCircle={String(saderCount)}
            textInCirlceColor="black"
            link="/saderbox"
          />

          <Circle
            backGroundColor="#fff"
            textUnderCircle="جميع المكاتبات"
            textInCircle={String(saderCount + waredCount)}
            textInCirlceColor="black"
          />
        </div>
      </div>
      {/* <div className="fs-3 text-right m-4">اخر المكاتبات</div> */}
      <div
        style={{
          display: "flex",
          // justifyContent: "end",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <div style={mokatbaBoxStyle} className="fs-3 m-4">
            <div className="fs-3 text-right my-3">اخر المكاتبات الصادر</div>

            <MiniSaderBox />
          </div>
          <div style={mokatbaBoxStyle} className="fs-3 m-4">
            <div className="fs-3 text-right my-3">اخر المكاتبات الوارد</div>

            <MiniWaredBox />
          </div>
        </div>
      </div>
    </div>
  );
}
export {  Home };
