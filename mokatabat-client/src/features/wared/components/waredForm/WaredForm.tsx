import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import isObjEmpty from "../../../../utils/isObjEmpty";
import isArrEmpty from "../../../../utils/isArrEmpty";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  submitFormData: Function;
  requiredFields: {
    selectedFile: any;
  };
  /**
   * if this form is used in edit page we will use this prop
   */
  waredIdToEdit?: any;
}
function WaredForm({ submitFormData, requiredFields, waredIdToEdit }: IProps) {
  let navigate = useNavigate();
  const [hasDeadline, setHasDeadline] = useState(false);

  const [gehaat, setGehaat] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [officers, setOfficers] = useState([]);

  const [docNum, setDocNum] = useState<string>("");
  const [docDepNum, setDocDepNum] = useState<string>("");
  const [mokatbaDate, setMokatbaDate] = useState<string>("");
  const [mokatbaDeliveryDate, setMokatbaDeliveryDate] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [deadLineDate, setDeadLineDate] = useState<string>("");
  const [lastWaredNum, setLastWaredNum] = useState<string>("");
  const [type, setType] = useState<string>("فاكس");

  const [selectedGehaa, setSelectedGehaa] = useState<any>({});
  const [selectedBranchs, setSelectedBranchs] = useState<any>([]);
  const [selectedOfficers, setSelectedOfficers] = useState<any>([]);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    axios.get("/api/waredoptions").then((res) => {
      setGehaat(res.data.gehaat);
      setBranchs(res.data.branches);
      setOfficers(res.data.officers);
    });
  }, []);
  useEffect(() => {
    // console.log("will fetch");
    if (waredIdToEdit) {
      axios
        .get("/api/wared/", {
          params: { id: waredIdToEdit },
        })
        .then((res) => {
          let { data } = res;
          // console.log(res.data);
          setDocNum(data.doc_num);
          setDocDepNum(data.doc_dept_num);
          setMokatbaDate(data.doc_date);
          setMokatbaDeliveryDate(data.deliver_date);
          setSubject(data.subject);
          setDeadLineDate(data.docDeadline);
          setLastWaredNum(data.lastWared_id);
          setType(data.type);
          setSelectedGehaa(data.gehaa);
          if (data.deadline) {
            setDeadLineDate(data.deadline);
            setHasDeadline(true);
          }
          let { branches } = data;
          setSelectedBranchs(
            branches.map((branch: any) => {
              return { label: branch.name, value: branch.id };
            })
          );
          let { Wared_Officers } = data;

          setSelectedOfficers(
            Wared_Officers.map((officer: any) => {
              return { label: officer.name, value: officer.id };
            })
          );
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
                  <label className="form-label">رقم الوارد</label>
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
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">رقم الادراة</label>
                  <input
                    type="text"
                    className="form-control fs-3"
                    id="exampleInputEmail1"
                    required
                    onChange={(e) => {
                      setDocDepNum(e.target.value);
                    }}
                    value={docDepNum}
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
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">تاريخ استلام المكاتبة</label>
                  <input
                    required
                    type="date"
                    className="form-control fs-3"
                    id="exampleInputEmail1"
                    onChange={(e) => {
                      setMokatbaDeliveryDate(e.target.value);
                    }}
                    value={mokatbaDeliveryDate}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="col-10">
              <label className="form-label">طريقة استلام المكاتبة</label>
              <select
                name=""
                id=""
                className="form-control fs-3"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="فاكس">فاكس</option>
                <option value="بريد">بريد</option>
                <option value="تراسل">تراسل</option>
              </select>
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
          <div className="mb-3">
            <div className="col-10">
              <label className="form-label">جهة الوارد</label>
              
              {!isArrEmpty(gehaat) && (
                 <Select
                 value={{
                   value: selectedGehaa?.id,
                   label: selectedGehaa?.name,
                 }}
                 onChange={(gehaaOption: any) => {
                   let choosedGehaa: any = gehaat.find((gehaa: any) => {
                     return gehaa.name == gehaaOption.label;
                   });
                   setSelectedGehaa(choosedGehaa);
                 }}
                 options={gehaat.map((gehaa: any) => {
                   return {
                     label: gehaa.name,
                     value: gehaa.id,
                   };
                 })}
               />
              )}
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الافرع المختصة </label>

                {!isArrEmpty(branchs) && (
                  <MultiSelect
                    options={branchs.map((branch: any) => {
                      return { label: branch.name, value: branch.id };
                    })}
                    value={selectedBranchs}
                    onChange={setSelectedBranchs}
                    labelledBy="Select"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الضباط المختصين</label>

                {!isArrEmpty(officers) && (
                  <MultiSelect
                    options={officers
                      .filter((officer: any) => {
                        return selectedBranchs.some((branch: any) => {
                          // console.log(officer.branches_id  , branch.value)
                          //branch.value here is the branch id
                          return officer.branches_id === branch.value;
                        });
                      })
                      .map((officer: any) => {
                        return { label: officer.name, value: officer.id };
                      })}
                    value={selectedOfficers}
                    onChange={setSelectedOfficers}
                    labelledBy="Select"
                  />
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-check col-4 ">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={() => {
                  setHasDeadline(!hasDeadline);
                }}
                checked={hasDeadline}
              />
              <label className="form-check-label">مكاتبة ذات حد اقصى</label>
            </div>
          </div>
          <br />

          {hasDeadline && (
            <>
              <div className="row">
                <div className="col-6">
                  <div className="col-8">
                    <div className="mb-3">
                      <label className="form-label">
                        تاريخ الحد الاقصى للتنفيذ
                      </label>
                      <input
                        type="date"
                        className="form-control fs-3"
                        id="exampleInputEmail1"
                        onChange={(e) => {
                          setDeadLineDate(e.target.value);
                        }}
                        value={deadLineDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </>
          )}
          <div className="row">
            <div className="col-6">
              <div className="col-8">
                <div className="mb-3">
                  <label className="form-label">
                    ايماءً الى مكاتبة رقم: (اختياري)
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                  className="form-control form-control-lg"
                  required
                  id="formFileLg"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setSelectedFile(e.target.files[0]);
                      console.log({ isFilePicked });
                      setIsFilePicked(false);
                      if (e.target.files[0]) {
                        console.log({ file: e.target.files[0] });
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
            className="btn btn-primary fs-4"
            onClick={() => {
              // const isReqFieldsFilled = true;
              const isReqFieldsFilled = (): boolean => {
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
                if (
                  docNum &&
                  docDepNum &&
                  mokatbaDate &&
                  mokatbaDeliveryDate &&
                  subject &&
                  !isObjEmpty(selectedGehaa) &&
                  !isArrEmpty(selectedBranchs) &&
                  // !isArrEmpty(selectedOfficers) &&
                  isFieldValid(selectedFile, requiredFields.selectedFile)
                ) {
                  return true;
                }
                console.log({
                  docNum,
                  docDepNum,
                  mokatbaDate,
                  mokatbaDeliveryDate,
                  subject,
                  selectedGehaa,
                  selectedBranchs,
                  selectedOfficers,
                });
                return false;
              };
              if (isReqFieldsFilled()) {
                let formData = new FormData();
                if (waredIdToEdit) {
                  formData.append("waredId", waredIdToEdit);
                }
                formData.append("doc_num", docNum);
                formData.append("doc_dept_num", docDepNum);
                formData.append("type", type);
                formData.append("doc_date", mokatbaDate);
                formData.append("deliver_date", mokatbaDeliveryDate);
                formData.append("subject", subject);
                formData.append("hasDeadLine", `${hasDeadline}`);
                formData.append("docDeadline", deadLineDate);
                formData.append("lastWaredNum", lastWaredNum); 
                formData.append("gehaa_id", selectedGehaa.id); 
                formData.append(
                  "selectedBranchs",
                  JSON.stringify(selectedBranchs)
                );
                formData.append(
                  "selectedOfficers",
                  JSON.stringify(selectedOfficers)
                );
                formData.append("mokatbaPdf", selectedFile);
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

export { WaredForm };
