import { useRef, useState } from "react";
import { InputActionMeta } from "react-select";
import Select from "react-select";
import isArrEmpty from "../utils/isArrEmpty";
import getCurrentYear from "../helpers/getCurrentYear";

interface IProps {
  gehaat: any[];
  setLastWaredNumber: any;
  setLastWaredYear: any;
  setLastWaredGeha: any;
  lastWaredNumber?: any;
  lastWaredYear?: any;
  lastGehaa?: any;
}
function RefrenceToLastWared(props: IProps) {
  const [selectedGehaa, setSelectedGehaa] = useState<any>({});

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
                <label className="form-label">رقم الوارد</label>
                <input
                  type="text"
                  className="form-control fs-3"
                  id="exampleInputEmail1"
                  required
                  onChange={(e) => {
                    props.setLastWaredNumber(e.target.value);
                  }}
                  value={props.lastWaredNumber}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="col-8">
              <div className="mb-3">
                <label className="form-label"> السنة </label>
                <input
                  type="number"
                  className="form-control fs-3"
                  min="2016"
                  max={getCurrentYear()}
                  step="1"
                  onChange={(e) => {
                    props.setLastWaredYear(e.target.value);
                  }}
                  value={props.lastWaredYear}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <label className="form-label"> الجهة </label>
            {!isArrEmpty(props.gehaat) && (
              <Select
                value={props.lastGehaa}
                onChange={(gehaaOption: any) => {
                  setSelectedGehaa(gehaaOption);
                  props.setLastWaredGeha(gehaaOption);
                }}
                options={props.gehaat}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default RefrenceToLastWared;
