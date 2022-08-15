import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import axios from "axios";
import isArrEmpty from "../../../../../../utils/isArrEmpty";
import { serverApiUrl } from "../../../../../../config";

interface IProps {
  selectedBranches: any;
  selectedEditedBranches: any;
  setSelectedEditedBranches:any;
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
                <ul>
                  {!isArrEmpty(selectedBranches) &&
                    selectedBranches.map((branch: any) => {
                      return <li className="text-secondary">{branch.name}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <label className="form-label"> تعديل الأفرع المختصة </label>
          {!isArrEmpty(branchesChoises) && (
            <MultiSelect
              options={branchesChoises.map((branch: any) => {
                return { label: branch.name, value: branch.id };
              })}
              value={selectedEditedBranches}
              onChange={setSelectedEditedBranches}
              labelledBy="Select"
            />
          )}
        </div>
      </div>
    </>
  );
}

export { BranchesSelect };
