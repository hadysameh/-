import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
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
      <div className="row " key={selectedEditedOfficers}>
        <div className="col-4">
          <div className="  ">
            <div className="">
              الضباط المختصين:
              <div style={{ paddingRight: "20px" }}>
                <ul>
                  {!isArrEmpty(selectedOfficers) &&
                    selectedOfficers.map((officer: any) => {
                      return <li className="text-secondary">{officer.name}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {!isArrEmpty(officersChoices) && (
          <div className="col-6">
            <label className="form-label">تعديل الضباط المختصين</label>
            {!isArrEmpty(officersChoices) && (
              <MultiSelect
                options={officersChoices.map((officer: any) => {
                  return { label: officer.name, value: officer.id };
                })}
                value={selectedEditedOfficers}
                onChange={setSelectedEditedOfficers}
                closeOnChangedValue={false}
                labelledBy="2"
              />
            )}
          </div>
        )}

      </div>
    </>
  );
}

export { OfficersSelect };
