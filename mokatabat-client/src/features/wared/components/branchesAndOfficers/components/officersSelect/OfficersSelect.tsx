import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import isArrEmpty from "../../../../../../utils/isArrEmpty";

interface IProps {
  selectedOfficers: any;
  selectedEditedOfficers: any;
  setSelectedEditedOfficers: any;
  officersChoices: any;
}
function OfficersSelect({
  selectedOfficers,
  selectedEditedOfficers,
  setSelectedEditedOfficers,
  officersChoices,
}: IProps) {
  // const [selectedEditedOfficers, setselectedEditedOfficers] = useState([]);
  return (
    <>
      <React.StrictMode>
        <div className="row">
          <div className="col-4">
            <div className="  ">
              <div className="">
                الضباط المختصين:
                <div style={{ paddingRight: "20px" }}>
                  <ul>
                    {!isArrEmpty(selectedOfficers) &&
                      selectedOfficers.map((officer: any) => {
                        return (
                          <li className="text-secondary" key={officer.id}>
                            {officer.name}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {!isArrEmpty(officersChoices) && (
            <div className="col-6">
              <label className="form-label" id='officers-select-label' >تعديل الضباط المختصين</label>
              {!isArrEmpty(officersChoices) && (
                <MultiSelect
                  options={officersChoices.map((officer: any) => {
                    return { label: officer.name, value: officer.id };
                  })}
                  value={selectedEditedOfficers}
                  onChange={setSelectedEditedOfficers}
                  labelledBy='officers-select-label' 
                />
              )}
            </div>
          )}
        </div>
      </React.StrictMode>
    </>
  );
}

export { OfficersSelect };
