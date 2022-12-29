import { useRef, useState } from "react";
import { InputActionMeta } from "react-select";
import Select from "react-select";
import isArrEmpty from "../utils/isArrEmpty";

interface IProps {
  gehaat: any[];
  setLastSaderNumber: any;
  setLastSaderYear: any;
  lastSaderNumber?: any;
  lastSaderYear?: any;
}
function RefrenceToLastSader(props: IProps) {

  return (
    <>
      <div
        style={{
          borderStyle: "solid",
          borderColor: "grey",
          borderRadius: "5px",
          borderWidth: "3px",
          padding: "5px",
        }}
      >
        <div className="row">
          <div className="col-6">
            <div className="col-8">
              <div className="mb-3">
                <label className="form-label">رقم الصادر</label>
                <input
                  type="text"
                  className="form-control fs-3"
                  id="exampleInputEmail1"
                  required
                  onChange={(e) => {
                    props.setLastSaderNumber(e.target.value);
                  }}
                  value={props.lastSaderNumber}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="col-8">
              <div className="mb-3">
                <label className="form-label"> السنة </label>
                <input
                  type="text"
                  className="form-control fs-3"
                  id="exampleInputEmail1"
                  required
                  onChange={(e) => {
                    props.setLastSaderYear(e.target.value);
                  }}
                  value={props.lastSaderYear}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
export default RefrenceToLastSader;
