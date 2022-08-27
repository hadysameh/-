import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { serverApiUrl } from "../../../../config";
import { waredBoxType } from "../../../../types";
import isArrEmpty from "../../../../utils/isArrEmpty";
import Select from "react-select";
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
  waredBoxType: string;
}
function SearchBox(props: SearchFormProps) {
  const [isSearched, setIsSearched] = useState(false);
  const [gehaatOptions, setGehaatOptions] = useState([]);
  const [branchsOptions, setBranchsOptions] = useState([]);
  const [officersOptions, setOfficersOptions] = useState([""]);

  const [selectedGehaaName, setSelectedGehaaName] = useState("");
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedOfficerName, setSelectedOfficerName] = useState("");

  /*
  0 : بدون حد ادني او اقصى للتنفيذ
  1 : قريبة من الحد الاقصى للتنفي 
  2 : بعيدة عن الحد الاقثى للتنفبذ
  */
  const [
    showDaysBeforeExecutionFields,
    setShowDaysBeforeExecutionFields,
  ] = useState<boolean>(true);
  const [defaultDaysBeforeExecution, setDefaultDaysBeforeExecution] = useState(
    "7"
  );

  const getOptionNameById = useCallback((optionId: string, options: any[]) => {
    // console.log({gehaaId})
    let optionObj: any = options.find((option: any) => option.id === optionId);
    // console.log({ gehaaObj, gehaaId });

    if (optionObj) {
      return optionObj.name;
    } else {
      return "";
    }
  }, []);

  const getGehaaNameById = (gehaaId:string,gehaatOptions:any[]) => {
    return getOptionNameById(gehaaId, gehaatOptions);
  };

  const getBranchNameById = (branchId:string,branchsOptions:any[]) => {
    return getOptionNameById(branchId, branchsOptions);
  };

  const getOfficerNameById = (officerId:string,officersOptions:any[]) => {
    return getOptionNameById(officerId, officersOptions);
  };
  

  useEffect(() => {
    axios.get(serverApiUrl + "api/waredoptions").then((res) => {
      // console.log({ res });
      setGehaatOptions(res.data.gehaat);
      setBranchsOptions(res.data.branches);
      setOfficersOptions(res.data.officers);
    });
    // TODO : fetch from srever
    setDefaultDaysBeforeExecution("7");
    setShowDaysBeforeExecutionFields(false);
    // setShowDaysBeforeExecutionFields(
    //   props.waredBoxType === waredBoxType.normal && true
    // );
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
            <Select
              value={{
                value: props.gehaaId,
                label: getGehaaNameById(props.gehaaId,gehaatOptions),
              }}
              onChange={(gehaaOption: any) => {
                props.setGehaaId(gehaaOption.value);
              }}
              options={gehaatOptions.map((gehaa: any) => {
                return {
                  value: gehaa.id,
                  label: gehaa.name,
                };
              })}
            />
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

          {!isArrEmpty(branchsOptions) && (
            <div className="col-md-3">
              <label className="form-label">الفرع المختص</label>

              <Select
              value={{
                value: props.branchId,
                label: getBranchNameById(props.branchId,branchsOptions),
              }}
              onChange={(branchOption: any) => {
                props.setBranchId(branchOption.value);
              }}
              options={branchsOptions.map((branch: any) => {
                return {
                  value: branch.id,
                  label: branch.name,
                };
              })}
            />
              {/* <input
                className="form-control fs-3"
                list="branchsOptions"
                id="exampleDataList"
                placeholder="Type to search..."
                value={selectedBranchName}
                onChange={(e) => {
                  let choosedBranchName = e.target.value;
                  setSelectedBranchName(e.target.value);
                  let choosedBranch: any = branchsOptions.find(
                    (branch: any) => {
                      return branch.name === choosedBranchName;
                    }
                  );
                  let choosedBranchId = choosedBranch ? choosedBranch.id : "";
                  // console.log(choosedBranchId);
                  props.setBranchId(choosedBranchId);
                }}
              ></input>

              <datalist id="branchsOptions">
                {branchsOptions.map((branch: any) => {
                  return (
                    <option key={branch.id + branch.name}>{branch.name}</option>
                  );
                })}
              </datalist> */}
            </div>
          )}

          {!isArrEmpty(officersOptions) && (
            <div className="col-md-3">
              <label className="form-label">الضابط المختص</label>
              <Select
              value={{
                value: props.officerId,
                label: getOfficerNameById(props.officerId,officersOptions),
              }}
              onChange={(officerOption: any) => {
                props.setOfficerId(officerOption.value);
              }}
              options={officersOptions.map((branch: any) => {
                return {
                  value: branch.id,
                  label: branch.name,
                };
              })}
            />
              {/* <input
                className="form-control fs-3"
                list="officersOptions"
                id="exampleDataList"
                placeholder="Type to search..."
                value={selectedOfficerName}
                onChange={(e) => {
                  let choosedOfficerName = e.target.value;
                  setSelectedOfficerName(e.target.value);
                  let choosedOfficer: any = officersOptions.find(
                    (officer: any) => {
                      return officer.name == choosedOfficerName;
                    }
                  );
                  let choosedOfficerId = choosedOfficer
                    ? choosedOfficer.id
                    : "";
                  props.setOfficerId(choosedOfficerId);
                }}
              ></input>

              <datalist id="officersOptions">
                {officersOptions.map((officer: any) => {
                  return (
                    <option key={officer.id + officer.name}>
                      {officer.name}
                    </option>
                  );
                })}
              </datalist> */}
            </div>
          )}

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

          {showDaysBeforeExecutionFields && (
            <>
              <div className="col-md-3">
                <label className="form-label">الحد الأقصى للتنفيذ (يوم)</label>
                <input
                  type="text"
                  className="form-control fs-3"
                  id="exampleInputEmail1"
                  // defaultValue={props.DaysBeforeExecution}
                  value={props.DaysBeforeExecution}
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    props.setDaysBeforeExecution(e.target.value);
                  }}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">ضمن موعد محدد للتنفيذ</label>
                <select
                  id="inputState"
                  className="form-select fs-3"
                  value={props.withinExcutionTimeType}
                  onChange={(e) => {
                    props.setWithinExcutionTimeType(e.target.value);
                  }}
                >
                  <option selected value="0">
                    غير محدد
                  </option>
                  <option value="1">قريبة من أو تجاوزت الحد الأقصى</option>
                  <option value="2">بعيدة عن الحد الأقصى</option>
                </select>
              </div>
            </>
          )}
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
                const withinExcutionTimeTypeDefaultValue =
                  props.waredBoxType === waredBoxType.normal
                    ? "0"
                    : props.waredBoxType === waredBoxType.red
                    ? "1"
                    : "2";
                props.setDocNum("");
                props.setGehaaId("");
                props.setsubject("");
                props.setBranchId("");
                props.setOfficerId("");
                props.setMokatbaDate("");
                props.setDocDeptNum("");
                props.setDaysBeforeExecution(defaultDaysBeforeExecution);
                props.setWithinExcutionTimeType(
                  withinExcutionTimeTypeDefaultValue
                );
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
