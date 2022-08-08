import { useEffect, useState } from "react";
import axios from "axios";
import { serverApiUrl } from "../../../../config";

interface SearchFormProps {
  setDocNum: any;
  setGehaaId: any;
  setsubject: any;
  setBranchId: any;
  setOfficerId: any;
  setDocDeptNum: any;
  setDaysBeforeExecution: any;
  setWithinExcutionTimeType: any;
  fetchSearchResults: any;
  fetchRowsWithNoParams: any;
  docNum: any;
  docDeptNum: any;
  gehaaId: any;
  subject: any;
  branchId: any;
  officerId: any;
  mokatbaDate: any;
  setMokatbaDate: any;
  DaysBeforeExecution: any;
  withinExcutionTimeType: any;
}
function SearchBox(props: SearchFormProps) {
  const [isSearched, setIsSearched] = useState(false);
  const [gehaat, setGehaat] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [officers, setOfficers] = useState([""]);

  const [selectedGehaaName, setSelectedGehaaName] = useState("");
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedOfficerName, setSelectedOfficerName] = useState("");
  /*
  0 : بدون حد ادني او اقصى للتنفيذ
  1 : قريبة من الحد الاقصى للتنفي 
  2 : بعيدة عن الحد الاقثى للتنفبذ
  */
  useEffect(() => {
    axios.get(serverApiUrl + "api/waredbox/searchoptions").then((res) => {
      setGehaat(res.data.gehaat);
      setBranchs(res.data.branches);
      setOfficers(res.data.officers);
    });
  }, []);

  return (
    <div>
      <div className="p-3 border mb-4 mt-4" dir="">
        <form
          className="row g-3 fs-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="col-md-3">
            <label className="form-label">رقم الوارد</label>
            <input
              type="text"
              className="form-control fs-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={props.docNum}
              onChange={(e) => {
                props.setDocNum(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">رقم الإدارة</label>
            <input
              type="text"
              className="form-control fs-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={props.docDeptNum}
              onChange={(e) => {
                props.setDocDeptNum(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">جهة الوارد</label>
            <input
              className="form-control fs-3"
              list="gehaatOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              value={selectedGehaaName}
              onChange={(e) => {
                let choosedGehaaName = e.target.value;
                setSelectedGehaaName(e.target.value);
                let choosedGehaa: any = gehaat.find((gehaa: any) => {
                  return gehaa.name === choosedGehaaName;
                });
                let choosedGehaaId = choosedGehaa ? choosedGehaa.id : "";
                // console.log(choosedBranchId);
                props.setGehaaId(choosedGehaaId);
              }}
            ></input>
            <datalist id="gehaatOptions">
              {gehaat.map((gehaa: any) => {
                return (
                  <option key={gehaa.id + gehaa.name}>{gehaa.name}</option>
                );
              })}
            </datalist>
          </div>
          <div className="col-md-3">
            <label className="form-label">موضوع المكاتبة</label>
            <input
              type="text"
              className="form-control fs-3"
              id="exampleInputEmail1"
              value={props.subject}
              aria-describedby="emailHelp"
              onChange={(e) => {
                props.setsubject(e.target.value);
              }}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">الفرع المختص</label>

            <input
              className="form-control fs-3"
              list="branchsOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              value={selectedBranchName}
              onChange={(e) => {
                let choosedBranchName = e.target.value;
                setSelectedBranchName(e.target.value);
                let choosedBranch: any = branchs.find((branch: any) => {
                  return branch.name === choosedBranchName;
                });
                let choosedBranchId = choosedBranch ? choosedBranch.id : "";
                // console.log(choosedBranchId);
                props.setBranchId(choosedBranchId);
              }}
            ></input>
            <datalist id="branchsOptions">
              {branchs.map((branch: any) => {
                return (
                  <option key={branch.id + branch.name}>{branch.name}</option>
                );
              })}
            </datalist>
          </div>

          <div className="col-md-3">
            <label className="form-label">الضابط المختص</label>
            <input
              className="form-control fs-3"
              list="officersOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              value={selectedOfficerName}
              onChange={(e) => {
                let choosedOfficerName = e.target.value;
                setSelectedOfficerName(e.target.value);
                let choosedOfficer: any = officers.find((officer: any) => {
                  return officer.name == choosedOfficerName;
                });
                let choosedOfficerId = choosedOfficer ? choosedOfficer.id : "";
                props.setOfficerId(choosedOfficerId);
              }}
            ></input>
            <datalist id="officersOptions">
              {officers.map((officer: any) => {
                return (
                  <option key={officer.id + officer.name}>
                    {officer.name}
                  </option>
                );
              })}
            </datalist>
          </div>

          <div className="col-md-3">
            <label className="form-label">تاريخ المكاتبة</label>
            <input
              type="date"
              className="form-control fs-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={props.mokatbaDate}
              onChange={(e) => {
                props.setMokatbaDate(e.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-evenly">
            <button
              className="btn btn-primary fs-4 btn-lg  px-5"
              onClick={() => {
                props.fetchSearchResults();
                setIsSearched(true);
              }}
            >
              بحث
            </button>
            <button
              className="btn btn-danger fs-4 btn-lg px-5"
              onClick={() => {
                props.setDocNum("");
                props.setGehaaId("");
                props.setsubject("");
                props.setBranchId("");
                props.setOfficerId("");
                props.setMokatbaDate("");
                props.setDocDeptNum("");
                props.setDaysBeforeExecution("4");
                props.setWithinExcutionTimeType("0");
                props.fetchRowsWithNoParams();
                setSelectedOfficerName("");
                setSelectedBranchName("");
                setSelectedGehaaName("");
                setIsSearched(false);
              }}
            >
              الغاء
            </button>
          </div>
        </form>
        <div></div>
      </div>
      {isSearched && (
        <>
          <h2>نتائج البحث</h2>
        </>
      )}
    </div>
  );
}
export { SearchBox };
