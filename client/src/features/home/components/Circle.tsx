import { Link } from "react-router-dom";
interface ICircleProps {
  backGroundColor: string;
  textInCircle: string;
  textUnderCircle: string;
  textInCirlceColor?: string;
  link?: string;
}

function Circle(props: ICircleProps) {
  let circleStyle = {
    background: props.backGroundColor,
    width: "150px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    borderStyle: "solid",
    borderWidth: "2px",
  };
  let aStyle = {
    textDecoration: "none",
    color: "#000",
  };
  return (
    <div>
      <Link to={props.link ? props.link : ""} style={aStyle}>
        <div className="rounded-circle text-center" style={circleStyle}>
          <span
            style={{
              color: props.textInCirlceColor ? props.textInCirlceColor : "#fff",
            }}
          >
            {props.textInCircle}
          </span>
        </div>
      </Link>

      <div
        dir="rtl"
        style={{
          width: "150px",
        }}
      >
        <Link to={props.link ? props.link : ""} style={aStyle}>
          <div className="text-center">{props.textUnderCircle}</div>
        </Link>
      </div>
    </div>
  );
}

export default Circle;
