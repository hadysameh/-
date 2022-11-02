import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import isArrEmpty from "../../../../utils/isArrEmpty";
import isObjEmpty from "../../../../utils/isObjEmpty";
import Select from "react-select";

interface SearchFormProps {
  setDocNum: any;
  setGehaaId: any;
  setsubject: any;
  setBranchId: any;
  setOfficerId: any;
  fetchSearchResults: any;
  fetchRowsWithNoParams: any;
  docNum: any;
  gehaaId: any;
  subject: any;
  branchId: any;
  officerId: any;
  mokatbaDate: any;
  setMokatbaDate: any;
  closedWaredDocNum: any;
  setClosedWaredDocNum: any;
}
function SearchBox(props: SearchFormProps) {
  const [isSearched, setIsSearched] = useState(false);
  const [gehaatOptions, setGehaatOptions] = useState([]);
  const [branchsOptions, setBranchsOptions] = useState([]);
  const [officersOptions, setOfficersOptions] = useState([""]);

  const [selectedGehaaName, setSelectedGehaaName] = useState("");
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedOfficerName, setSelectedOfficerName] = useState("");
  const clearSearchParams = () => {
    props.setDocNum("");
    props.setGehaaId("");
    props.setsubject("");
    props.setBranchId("");
    props.setOfficerId("");
    props.setMokatbaDate("");
    props.setClosedWaredDocNum("");
    props.fetchRowsWithNoParams();
    setSelectedOfficerName("");
    setSelectedBranchName("");
    setSelectedGehaaName("");
    setIsSearched(false);
  };
  useEffect(() => {
    axios.get("/api/saderoptions").then((res) => {
      setGehaatOptions(res.data.gehaat);
      setBranchsOptions(res.data.branches);
      setOfficersOptions(res.data.officers);
    });
  }, []);
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

  const getGehaaNameById = (gehaaId: string, gehaatOptions: any[]) => {
    return getOptionNameById(gehaaId, gehaatOptions);
  };

  const getBranchNameById = (branchId: string, branchsOptions: any[]) => {
    return getOptionNameById(branchId, branchsOptions);
  };

  const getOfficerNameById = (officerId: string, officersOptions: any[]) => {
    return getOptionNameById(officerId, officersOptions);
  };
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
            <label className="form-label">رقم الصادر</label>
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
            <label className="form-label">تاريخ الصادر</label>
            <input
              type="date"
              className="form-control fs-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={props.mokatbaDate}
              onChange={(e) => {
                props.setMokatbaDate(e.target.value);
              }}
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
          <div className="col-md-3">
            <label className="form-label">جهة الصادر</label>
            <Select
              value={{
                value: props.gehaaId,
                label: getGehaaNameById(props.gehaaId, gehaatOptions),
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
            {/* <input
              className="form-control fs-3"
              list="gehaatOptions"
              id="exampleDataList"
              placeholder="Type to search..."
              value={selectedGehaaName}
              onChange={(e) => {
                let choosedGehaaName = e.target.value;
                setSelectedGehaaName(e.target.value);
                let choosedGehaa: any = gehaat.find((gehaa: any) => {
                  return gehaa.name == choosedGehaaName;
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
            </datalist> */}
          </div>

          {!isArrEmpty(officersOptions) && (
            <div className="col-md-3">
              <label className="form-label">الضابط المختص</label>
              <Select
                value={{
                  value: props.officerId,
                  label: getOfficerNameById(props.officerId, officersOptions),
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
                  // console.log(choosedOfficerId);
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

          {!isArrEmpty(branchsOptions) && (
            <div className="col-md-3">
              <label className="form-label">الفرع المختص</label>
              <Select
                value={{
                  value: props.branchId,
                  label: getBranchNameById(props.branchId, branchsOptions),
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
                      return branch.name == choosedBranchName;
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

          {/* TODO */}
          <div className="col-md-3">
            <label className="form-label">متصلة بوارد رقم</label>
            <input
              type="text"
              className="form-control fs-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={props.closedWaredDocNum}
              onChange={(e) => {
                props.setClosedWaredDocNum(e.target.value);
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
                // props.setDocNum("");
                // props.setGehaaId("");
                // props.setsubject("");
                // props.setBranchId("");
                // props.setOfficerId("");
                // props.setMokatbaDate("");
                // props.setLastWaredNum("");
                // props.fetchRowsWithNoParams();
                // setSelectedOfficerName("");
                // setSelectedBranchName("");
                // setSelectedGehaaName("");
                // setIsSearched(false);
                clearSearchParams();
              }}
            >
              الغاء
            </button>
          </div>
        </form>
        <div>
          {/* {isSearched && (
          <>
            <h2>كلمات البحث الدالة</h2>
            <div className="d-flex justify-content-evenly">
              <div className="fs-3">
                رقم الوارد:{props.docNum ? props.docNum : "لايوجد"}
              </div>
              <div className="fs-3">
                رقم الادارة:{props.docDeptNum ? props.docDeptNum : "لايوجد"}
              </div>
              <div className="fs-3">
                hg:{selectedGehaaName ? selectedGehaaName : "لايوجد"}
              </div>
            </div>
          </>
        )} */}
        </div>
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
