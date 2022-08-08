import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import isObjEmpty from "../../../../utils/isObjEmpty";
import isArrEmpty from "../../../../utils/isArrEmpty";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverApiUrl } from "../../../../config";

interface IProps {
  submitFormData: Function;
  requiredFields: {
    docNum: any;
    docDepNum: any;
    mokatbaDate: any;
    mokatbaDeliveryDate: any;
    subject: any;
    deadLineDate: any;
    lastWaredNum: any;
    type: any;
    selectedGehaa: any;
    selectedBranchs: any;
    selectedOfficers: any;
    selectedFile: any;
  };
}
function WaredForm({ submitFormData, requiredFields }: IProps) {
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
    axios.get(serverApiUrl + "waredbox/searchoptions").then((res) => {
      setGehaat(res.data.gehaat);
      setBranchs(res.data.branches);
      setOfficers(res.data.officers);
    });
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
                    required={requiredFields.docNum}
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
                    required={requiredFields.docDepNum}
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
                    required={requiredFields.mokatbaDate}
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
                    required={requiredFields.mokatbaDeliveryDate}
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
                required={requiredFields.subject}
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
              <input
                required={requiredFields.selectedGehaa}
                className="form-control fs-3"
                list="gehaatOptions"
                id="exampleDataList"
                placeholder="Type to search..."
                value={selectedGehaa ? selectedGehaa.name : ""}
                onChange={(e) => {
                  let choosedGehaahName = e.target.value;
                  let choosedGehaa: any = gehaat.find((gehaa: any) => {
                    return gehaa.name == choosedGehaahName;
                  });
                  setSelectedGehaa(choosedGehaa);
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
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الافرع المختصة </label>

                <MultiSelect
                  options={branchs.map((branch: any) => {
                    return { label: branch.name, value: branch.id };
                  })}
                  value={selectedBranchs}
                  onChange={setSelectedBranchs}
                  labelledBy="Select"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10">
                <label className="form-label">الضباط المختصين</label>

                <MultiSelect
                  options={officers.map((officer: any) => {
                    return { label: officer.name, value: officer.id };
                  })}
                  value={selectedOfficers}
                  onChange={setSelectedOfficers}
                  labelledBy="Select"
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-check col-4 ">
              <input
                className="form-check-input"
                type="checkbox"
                required={requiredFields.selectedOfficers}
                id="flexCheckDefault"
                onChange={() => {
                  setHasDeadline(!hasDeadline);
                }}
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
                        className="form-control"
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
                    required={requiredFields.lastWaredNum}
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
                  required={requiredFields.selectedFile}
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
                      {selectedFile?.lastModifiedDate.toLocaleDateString()}
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
                if (
                  docNum &&
                  requiredFields.docNum &&
                  docDepNum &&
                  requiredFields.docDepNum &&
                  mokatbaDate &&
                  requiredFields.mokatbaDate &&
                  mokatbaDeliveryDate &&
                  requiredFields.mokatbaDeliveryDate &&
                  subject &&
                  requiredFields.subject &&
                  !isObjEmpty(selectedGehaa) &&
                  !isArrEmpty(selectedBranchs) &&
                  !isArrEmpty(selectedOfficers) &&
                  selectedFile &&
                  requiredFields.selectedFile
                ) {
                  return true;
                }
                return false;
              };
              if (isReqFieldsFilled()) {
                let formData = new FormData();

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
                // console.log({ selectedBranchs, selectedOfficers });
                submitFormData(formData);
                // axios
                //   .post(serverApiUrl + "/waredbox/store", formData)
                //   .then((res: any) => {
                //     console.log(res);
                //     console.log("will navigate");
                //     navigate("/waredbox");
                //   })
                //   .catch((err: any) => {
                //     alert(
                //       "فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة"
                //     );
                //     console.log({ err, msg: "error" });
                //   });
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
