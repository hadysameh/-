import { useEffect, useState } from "react";
import { OfficersSelect } from "./components/officersSelect";
import { BranchesSelect } from "./components/branchesSelect";
import { serverApiUrl } from "../../../../config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  selectedOfficers: any;
  selectedBranches: any;
  mokatbaData: any;
}

function BranchesAndOfficers(props: IProps) {
  let navigate = useNavigate();

  const [selectedEditedBranches, setSelectedEditedBranches] = useState<any>([]);
  const [selectedEditedOfficers, setselectedEditedOfficers] = useState<any>([]);

  const [branchesChoises, setBranchesChoices] = useState([]);
  const [officersChoices, setOfficersChoices] = useState([]);

  useEffect(() => {
    axios.get(serverApiUrl + "api/waredbox/searchoptions").then((res) => {
      const branches = res.data.branches;
      const officers = res.data.officers;
      setBranchesChoices(branches);
      setOfficersChoices(officers);

      console.log({ mokatbaData:props.mokatbaData });

      let selectedOfficers = props.mokatbaData.Wared_Officers.map(
        (officer: any) => {
          return { label: officer.name, value: officer.id };
        }
      );

      let selectedBranches = props.mokatbaData.branches.map((branch: any) => {
        return { label: branch.name, value: branch.id };
      });
      setselectedEditedOfficers([...selectedOfficers]);
      setSelectedEditedBranches([...selectedBranches]);
    });
  }, []);

  const submitModifiedWared = (ModifiedWaredData: any) => {
    axios
      .put(
        serverApiUrl + "api/waredbox/updateOfficersAndBranches",
        ModifiedWaredData
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("فشل في تعديل المكاتبة");
        console.log({ err, msg: "error" });
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "55px",
        }}
      >
        <OfficersSelect
          officersChoices={officersChoices}
          selectedOfficers={props.mokatbaData.Wared_Officers}
          selectedEditedOfficers={selectedEditedOfficers}
          setselectedEditedOfficers={setselectedEditedOfficers}
        />
        <br />
        <BranchesSelect
          branchesChoises={branchesChoises}
          selectedBranches={props.mokatbaData.branches}
          selectedEditedBranches={selectedEditedBranches}
          setSelectedEditedBranches={setSelectedEditedBranches}
        />
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary fs-4"
            onClick={() => {
              console.log({
                selectedEditedBranches,
                selectedEditedOfficers,
              });
              submitModifiedWared({
                waredId: props.mokatbaData.id,
                selectedOfficers: JSON.stringify(selectedEditedOfficers),
                selectedBranchs: JSON.stringify(selectedEditedBranches),
              });
            }}
          >
            تعديل
          </button>
        </div>
      </div>
    </>
  );
}

export { BranchesAndOfficers };
