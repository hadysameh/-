import { useEffect, useState } from "react";
import { OfficersSelect } from "./components/officersSelect";
import { BranchesSelect } from "./components/branchesSelect";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as premisions from "../../../../utils/premissions";
import socket from "../../../../services/socket-io";
import {socketIoEvent} from '../../../../types'
import {selectUser } from '../../../user/stores/userSlice'
import {useSelector} from 'react-redux'
interface IProps {
  mokatbaData: any;
}

function BranchesAndOfficers(props: IProps) {
  const user = useSelector(selectUser)
  let navigate = useNavigate();
  // console.log({
  //   hasAccessToEditWaredBranchs: premisions.hasAccessToEditWaredBranchs(),
  //   hasAccessToEditWaredOfficers: premisions.hasAccessToEditWaredOfficers(),
  // });
  const [selectedEditedBranches, setSelectedEditedBranches] = useState<any>([]);
  const [selectedEditedOfficers, setSelectedEditedOfficers] = useState<any>([]);

  const [branchesChoises, setBranchesChoices] = useState([]);
  const [officersChoices, setOfficersChoices] = useState([]);

  const getAndSetWaredOptions = () => {
    axios.get("/api/waredoptions").then((res) => {
      const branches = res.data.branches;
      const officers = res.data.officers;
      setBranchesChoices(branches);
      setOfficersChoices(officers);

      // console.log({ mokatbaData: props.mokatbaData });

      let selectedOfficers = props.mokatbaData.Wared_Officers.map(
        (officer: any) => {
          return { label: officer.name, value: officer.id };
        }
      );

      let selectedBranches = props.mokatbaData.branches.map((branch: any) => {
        return { label: branch.name, value: branch.id };
      });
      setSelectedEditedOfficers([...selectedOfficers]);
      setSelectedEditedBranches([...selectedBranches]);
    });
  };
  useEffect(() => {
    getAndSetWaredOptions();
  }, []);

  useEffect(() => {
    
    return () => {
      // socket.off("refetchWaredAndSaderUnreadNumbers");
    };
  }, []);

  const submitModifiedWared = (ModifiedWaredData: any) => {
    axios
      .put("/api/waredbox/updateOfficersAndBranches", ModifiedWaredData)
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        alert("فشل في تعديل المكاتبة");
        console.log({ err, msg: "error" });
      });
  };
  return (
    <>
      <div
        key={JSON.stringify(props.mokatbaData)}
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "55px",
        }}
      >
        <BranchesSelect
          branchesChoises={branchesChoises}
          selectedBranches={props.mokatbaData.branches}
          selectedEditedBranches={selectedEditedBranches}
          setSelectedEditedBranches={setSelectedEditedBranches}
        />
        <br />
        <OfficersSelect
          officersChoices={officersChoices.filter((officer: any) => {
            return selectedEditedBranches.some((branch: any) => {
              // console.log(officer.branches_id  , branch.value)
              //branch.value here is the branch id
              return officer.branches_id === branch.value;
            });
          })}
          selectedOfficers={props.mokatbaData.Wared_Officers}
          selectedEditedOfficers={selectedEditedOfficers}
          setSelectedEditedOfficers={setSelectedEditedOfficers}
        />
        {(premisions.hasAccessToEditWaredBranchs() ||
          premisions.hasAccessToEditWaredOfficers()) && (
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
        )}
      </div>
    </>
  );
}

export { BranchesAndOfficers };
