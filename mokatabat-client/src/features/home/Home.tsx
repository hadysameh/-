import logo from "../../logo.svg";
import Circle from "./components/Circle";
import MiniSaderBox from "./components/MiniSaderBox";
import MiniWaredBox from "./components/MiniWaredBox";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
function Home() {
  const [waredCount, setWaredCount] = useState(0);
  const [saderCount, setSaderCount] = useState(0);
  const [redCircleCount, setRedCircleCount] = useState(0);
  const [greenCircleCount, setGreenCircleCount] = useState(0);

  useEffect(() => {
    axios.get("/api/home").then((res) => {
      let { data } = res;
      // console.log({ data });
      setWaredCount(Number(data.waredCount));
      setSaderCount(Number(data.saderCount));
      setRedCircleCount(Number(data.redCircleCount));
      setGreenCircleCount(Number(data.greenCircleCount));
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
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
    <div className="" style={{ height: "80vh" }}>
      <div className="container" dir="rtl">
        <div className="row py-3 pt-3">
          <div className="col-xl-3 col-lg-6">
            <Card
              cardTitle="مكاتبات الصادر"
              count={String(saderCount)}
              link="/saderbox"
            />
          </div>
          <div className="col-xl-3 col-lg-6">
            <Card
              cardTitle="مكاتبات الوارد"
              count={String(waredCount)}
              link="/waredbox"
            />
          </div>
          <div className="col-xl-3 col-lg-6">
            <Card
              cardTitle="مكاتبات قريبة او تجاوزت الحد الاقصى للتنفذ"
              count={String(redCircleCount)}
              link="/redcirclewaredbox"
              backgroundColor="red"
              textColor="white"
            />
          </div>
          <div className="col-xl-3 col-lg-6">
            <Card
              cardTitle="مكاتبات بعيدة عن الحد الاقصى للتنفذ"
              count={String(greenCircleCount)}
              backgroundColor="green"
              link="/greencirclewaredbox"
              textColor="white"
            />
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center flex-column mt-4" style={{marginTop:'100px'}}>
        <img src="./edaraLogo.png" style={{ width: "25vw" }} />
        <div className="text-center fs-1">
          ادارة البحوث الفنية والتطوير
          <br />
          منظومة المكاتبات
        </div>
      </div>
    </div>
  );
}
export { Home };
