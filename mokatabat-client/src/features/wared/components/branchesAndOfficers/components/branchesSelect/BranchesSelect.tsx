import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import axios from "axios";
import isArrEmpty from "../../../../../../utils/isArrEmpty";

interface IProps {
  selectedBranches: any;
  selectedEditedBranches: any;
  setSelectedEditedBranches: any;
  branchesChoises: any;
}
function BranchesSelect({
  selectedBranches,
  selectedEditedBranches,
  setSelectedEditedBranches,
  branchesChoises,
}: IProps) {
  // const [selectedEditedBranches, setSelectedEditedBranches] = useState<any>([]);

  return (
    <>
      <div className="row">
        <div className="col-4">
          <div className="">
            <div className="">
              الأفرع المختصة:
              <div style={{ paddingRight: "20px" }}>
                <ul style={{listStyle:'none'}}>
                  {!isArrEmpty(selectedBranches) &&
                    selectedBranches.map((branch: any) => {
                      return <li className="text-secondary">{branch.name}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {!isArrEmpty(branchesChoises) && (
          <div className="col-6">
            <label className="form-label" id='branches-select-label' > تعديل الأفرع المختصة </label>
            {!isArrEmpty(branchesChoises) && (
              <MultiSelect
                options={branchesChoises.map((branch: any) => {
                  return { label: branch.name, value: branch.id };
                })}
                value={selectedEditedBranches}
                onChange={setSelectedEditedBranches}
                labelledBy="branches-select-label"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export { BranchesSelect };
