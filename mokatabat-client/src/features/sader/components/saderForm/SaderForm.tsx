import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import isObjEmpty from "../../../../utils/isObjEmpty";
import isArrEmpty from "../../../../utils/isArrEmpty";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverApiUrl } from "../../../../config";
import Select from "react-select";

interface IProps {
  submitFormDataMethod: Function;
  requiredFields: {
    selectedFile: any;
  };
  /**
   * if this form is used in edit page we will use this prop
   */
  saderIdToEdit?: any;
}
function SaderForm({
  submitFormDataMethod: submitFormData,
  requiredFields,
  saderIdToEdit,
}: IProps) {
  let navigate = useNavigate();

  const [gehaat, setGehaat] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [officers, setOfficers] = useState([]);

  const [docNum, setDocNum] = useState<string>("");
  const [mokatbaDate, setMokatbaDate] = useState<string>("");

  const [subject, setSubject] = useState<string>("");
  const [lastWaredNum, setLastWaredNum] = useState<string>("");
  const [type, setType] = useState<string>("فاكس");

  const [selectedGehaat, setSelectedGehaat] = useState<any>([]);
  const [selectedBranch, setSelectedBranch] = useState<any>({});
  const [selectedOfficer, setSelectedOfficer] = useState<any>({});

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axios.get(serverApiUrl + "api/saderoptions").then((res) => {
      setGehaat(res.data.gehaat);
      setBranchs(res.data.branches);
      setOfficers(res.data.officers);
    });
  }, []);

  useEffect(() => {
    if (saderIdToEdit) {
      axios
        .get(serverApiUrl+"api/onesader", {
          params: { id: saderIdToEdit },
        })
        .then((res) => {
          let { data } = res;
          setDocNum(data.doc_num);
          setMokatbaDate(data.doc_date);
          setSubject(data.subject);
          setLastWaredNum(data.lastWared_id);
          setType(data.type);
          setSelectedGehaat(
            data?.gehaas?.map((gehaa: any) => {
              return { label: gehaa.name, value: gehaa.id };
            })
          );
          setSelectedBranch(data.branch);
          setSelectedOfficer(data.SaderOfficer);
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="border-start border-end p-4">
        <form
          encType="multipart/form-data"
          className="fs-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">رقم الصادر</label>
                  <input
                    type="text"
                    className="form-control fs-3"
                    id="exampleInputEmail1"
                    required
                    onChange={(e) => {
                      setDocNum(e.target.value);
                    }}
                    value={docNum}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">تاريخ المكاتبة</label>
                  <input
                    type="date"
                    required
                    className="form-control fs-3"
                    id="exampleInputEmail1"
                    onChange={(e) => {
                      setMokatbaDate(e.target.value);
                    }}
                    value={mokatbaDate}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="col-10">
              <label className="form-label">الموضوع</label>
              <input
                required
                type="text"
                className="form-control fs-3"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                value={subject}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <label className="form-label">جهات الصادر</label>

              {!isArrEmpty(gehaat) && (
                <MultiSelect
                  options={gehaat.map((gehaa: any) => {
                    return { label: gehaa.name, value: gehaa.id };
                  })}
                  value={selectedGehaat}
                  onChange={setSelectedGehaat}
                  labelledBy="Select"
                />
              )}
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الفرع المختص</label>
                {!isArrEmpty(branchs) && (
                  <>
                    <Select
                      value={{
                        value: selectedBranch?.id,
                        label: selectedBranch?.name,
                      }}
                      onChange={(gehaaOption: any) => {
                        let choosedBranch: any = branchs.find((branch: any) => {
                          return branch.name == gehaaOption.label;
                        });
                        // console.log({choosedBranch})
                        setSelectedBranch(choosedBranch);
                      }}
                      options={branchs.map((branch: any) => {
                        return {
                          label: branch.name,
                          value: branch.id,
                        };
                      })}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الضابط المختص</label>
                {!isArrEmpty(officers) && (
                  <>
                    <Select
                      value={{
                        value: selectedOfficer?.id,
                        label: selectedOfficer?.name,
                      }}
                      onChange={(officerOption: any) => {
                        let choosedOfficer: any = officers.find(
                          (officer: any) => {
                            return officer.name == officerOption.label;
                          }
                        );
                        setSelectedOfficer(choosedOfficer);
                      }}
                      options={officers
                        .filter((officer: any) => {
                          // console.log(
                          //   officer.branches_id,
                          //   selectedBranch.value
                          // );
                          return officer.branches_id === selectedBranch.id;
                        })
                        .map((branch: any) => {
                          return {
                            label: branch.name,
                            value: branch.id,
                          };
                        })}
                    />
                    {/* <input
                      required
                      className="form-control fs-3"
                      list="officersOptions"
                      id="officersDataList"
                      placeholder="Type to search..."
                      value={selectedOfficer?.name}
                      onChange={(e) => {
                        let choosedOfficerName = e.target.value;
                        let choosedOfficer: any = officers.find(
                          (branch: any) => {
                            return branch.name === choosedOfficerName;
                          }
                        );
                        setSelectedOfficer(choosedOfficer);
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
                    </datalist> */}
                  </>
                )}
              </div>
            </div>
          </div>
          <br />

          <div className="mb-3">
            <div className="col-10">
              <label className="form-label">طريقة ارسال الصادر</label>
              <select
                name=""
                id=""
                className="form-control fs-3"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="فاكس" className="fs-3">
                  فاكس
                </option>
                <option value="بريد" className="fs-3">
                  بريد
                </option>
                <option value="تراسل" className="fs-3">
                  تراسل
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">
                    متصلة بوراد قم : (اختياري)
                  </label>
                  <input
                    type="text"
                    className="form-control fs-3"
                    id="exampleInputEmail1"
                    onChange={(e) => {
                      setLastWaredNum(e.target.value);
                    }}
                    value={lastWaredNum}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <div>
                <label className="form-label">ملف المكاتبة</label>
                <input
                  className="form-control form-control-lg fs-3"
                  required={requiredFields.selectedFile}
                  id="formFileLg"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFile(e.target.files[0]);
                      // console.log({ isFilePicked });
                      setIsFilePicked(false);
                      if (e.target.files[0]) {
                        // console.log({ file: e.target.files[0] });
                        setIsFilePicked(true);
                      }
                    }
                  }}
                />
                {isFilePicked ? (
                  <div>
                    <p>Filename: {selectedFile?.name}</p>
                    <p>Filetype: {selectedFile?.type}</p>
                    <p>Size in bytes: {selectedFile?.size}</p>
                    <p>
                      lastModifiedDate:{" "}
                      {selectedFile?.lastModifiedDate?.toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>اختر ملف المكاتبة لإظهار التفاصيل</p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary fs-3"
            onClick={() => {
              // const isReqFieldsFilled = true;
              const isFieldValid = (
                filed: any,
                isFieldRequired: boolean
              ): boolean => {
                if (isFieldRequired) {
                  if (filed) {
                    return true;
                  }
                  return false;
                }
                return true;
              };
              const isReqFieldsFilled = (): boolean => {
                if (
                  docNum &&
                  mokatbaDate &&
                  subject &&
                  !isArrEmpty(selectedGehaat) &&
                  !isObjEmpty(selectedBranch) &&
                  !isObjEmpty(selectedOfficer) &&
                  isFieldValid(selectedFile, requiredFields.selectedFile)
                ) {
                  return true;
                }
                // console.log({
                //   docNum,
                //   mokatbaDate,
                //   subject,
                //   lastWaredNum,
                //   selectedGehaat,
                //   selectedBranch,
                //   selectedFile,
                // });
                return false;
              };
              if (isReqFieldsFilled()) {
                let formData = new FormData();
                if (saderIdToEdit) {
                  formData.append("saderId", saderIdToEdit);
                }
                formData.append("doc_num", docNum);
                formData.append("type", type);
                formData.append("doc_date", mokatbaDate);
                formData.append("subject", subject);
                formData.append("lastWaredNum", lastWaredNum);
                formData.append("gehaat", JSON.stringify(selectedGehaat));
                formData.append("branch_id", selectedBranch.id);
                formData.append("officer_id", selectedOfficer.id);
                formData.append("mokatbaPdf", selectedFile);

                // axios
                //   .post(serverApiUrl + "api/saderbox/store", formData)
                //   .then((res) => {
                //     console.log(res);
                //     console.log("will navigate");
                //     navigate("/saderbox");
                //   })
                //   .catch((err) => {
                //     alert(
                //       "فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة"
                //     );
                //     console.log({ err, msg: "error" });
                //   });
                submitFormData(formData);
              } else {
                alert("من فضلك قم بملأ الخانات المطلوبة");
              }
            }}
          >
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
}
export { SaderForm };
