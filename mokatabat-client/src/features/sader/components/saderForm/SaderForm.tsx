import { MultiSelect } from "react-multi-select-component";
import { useCallback, useEffect, useState } from "react";
import isObjEmpty from "../../../../utils/isObjEmpty";
import isArrEmpty from "../../../../utils/isArrEmpty";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import RefrenceToLastWared from "../../../../components/RefrenceToLastWared";
import RefrenceToLastSader from "../../../../components/RefrenceToLastSader";
import { lastWaredTypesNames } from "../../../../types";
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
  const [type, setType] = useState<string>("فاكس");

  const [selectedGehaat, setSelectedGehaat] = useState<any>([]);
  const [selectedBranch, setSelectedBranch] = useState<any>({});
  const [selectedOfficer, setSelectedOfficer] = useState<any>({});

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [lastWaredType, setLastWaredType] = useState<string | null>(null);

  const [mokatbatWithDeadLine, setMokatbatWithDeadLine] = useState<any>([]);
  const [
    selectedMokatbatWithDeadLineForSader,
    setSelectedMokatbatWithDeadLineForSader,
  ] = useState<any>([]);

  const [
    isSaderForMokatabaWithDeadLine,
    setIsSaderForMokatabaWithDeadLine,
  ] = useState<any>(false);

  const [isSaderReferncingWared, setIsSaderReferncingWared] = useState<any>(
    false
  );
  const [lastWaredGeha, setLastWaredGeha] = useState<any>({});
  const [lastWaredNumber, setLastWaredNumber] = useState<any>();
  const [lastWaredYear, setLastWaredYear] = useState<any>();

  const [
    isSaderReferncingAnotherSader,
    setIsSaderReferncingAnotherSader,
  ] = useState<any>(false);

  const [lastSaderNumber, setLastSaderNumber] = useState<any>();
  const [lastSaderYear, setLastSaderYear] = useState<any>();

  const fetchSingleSader = useCallback(
    (saderId: FormData) => {
      axios
        .get("/api/onesader", {
          params: { id: saderId },
        })
        .then((res) => {
          let { data } = res;
          console.log({ data });
          setDocNum(data.doc_num);
          setMokatbaDate(data.doc_date);
          setSubject(data.subject);
          // setLastWaredNum(data.lastWared_id);
          setType(data.type);
          setSelectedGehaat(
            data?.gehaas?.map((gehaa: any) => {
              return { label: gehaa.name, value: gehaa.id };
            })
          );
          setSelectedBranch(data.branch);
          setSelectedOfficer(data.SaderOfficer);
          let mappedClosedWaredBySader = data.waredClosedSader.map(
            (closedWaredBySader: any) => ({
              label: closedWaredBySader.subject,
              value: closedWaredBySader.id,
            })
          );
          const isSaderHasWaredWithDeadLine = !!data.waredClosedSader?.length;
          const isSaderReferncingLastWared = Object.hasOwn(
            data.lastWared,
            "id"
          );
          if (isSaderHasWaredWithDeadLine) {
            setLastWaredType(lastWaredTypesNames.deadLineWared);
          } else if (isSaderReferncingLastWared) {
            setLastWaredType(lastWaredTypesNames.normalWared);
            setLastWaredNumber(data.lastWared.doc_num);
            setLastWaredYear(data.lastWared.year);
            let lastWaredGehaa = gehaat.find(
              (gehaa: { value: any; label: any }) =>
                gehaa.value === data.lastWared.gehaa_id
            );
            setLastWaredGeha(lastWaredGehaa);
          }
          setIsSaderReferncingWared(
            isSaderHasWaredWithDeadLine || isSaderReferncingLastWared
          );

          const isSaderReferncingAnotherSader = Object.hasOwn(
            data.lastSader,
            "id"
          );
          if (isSaderReferncingAnotherSader) {
            setIsSaderReferncingAnotherSader(true);
            setLastSaderNumber(data.lastSader.doc_num);
            setLastSaderYear(data.lastSader.year);
          }
          setSelectedMokatbatWithDeadLineForSader(mappedClosedWaredBySader);

          setIsSaderForMokatabaWithDeadLine(isSaderHasWaredWithDeadLine);
          setMokatbatWithDeadLine((mokatbatWithDeadLine: any) => [
            ...data.waredClosedSader,
            ...mokatbatWithDeadLine,
          ]);
        });
    },
    [gehaat]
  );

  useEffect(() => {
    axios.get("/api/saderoptions").then((res) => {
      const mappedGehaat = res.data.gehaat.map((gehaa: any) => {
        return { label: gehaa.name, value: gehaa.id };
      });
      setGehaat(mappedGehaat);
      setBranchs(res.data.branches);
      setOfficers(res.data.officers);
    });

    axios.get("/api/wared/waredwithdeadline").then((res) => {
      // setMokatbatWithDeadLine([...mokatbatWithDeadLine,...res.data]);

      setMokatbatWithDeadLine((mokatbatWithDeadLine: any) => [
        ...res.data,
        ...mokatbatWithDeadLine,
      ]);
    });
  }, []);

  useEffect(() => {
    if (gehaat.length) {
      if (saderIdToEdit) {
        fetchSingleSader(saderIdToEdit);
      }
    }
  }, [gehaat]);

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
                  options={gehaat}
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
                      options={officers.map((branch: any) => {
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

          <br />
          <div>
            <div className="col-10">
              <input
                className="form-check-input"
                onChange={() => {
                  setIsSaderReferncingWared(!isSaderReferncingWared);
                }}
                style={{ marginLeft: "10px" }}
                type="checkbox"
                checked={isSaderReferncingWared}
              />
              <label className="form-label">الإشارة الى وارد سابق</label>
            </div>
            {isSaderReferncingWared && (
              <>
                <div className="row">
                  <div className="col-10">
                    <input
                      className="form-check-input"
                      onChange={(e) => {
                        setLastWaredType(e.target.value);
                      }}
                      style={{ marginLeft: "10px" }}
                      value={lastWaredTypesNames.deadLineWared}
                      type="radio"
                      checked={
                        lastWaredType == lastWaredTypesNames.deadLineWared
                      }
                    />
                    <label className="form-label"> وارد وجوب رد</label>

                    {lastWaredType === lastWaredTypesNames.deadLineWared && (
                      <>
                        <ul className="px-4">
                          {selectedMokatbatWithDeadLineForSader.map(
                            (selectedMokatbaWithDeadLineForSader: any) => (
                              <li
                                key={selectedMokatbaWithDeadLineForSader.value}
                              >
                                {selectedMokatbaWithDeadLineForSader.label}
                              </li>
                            )
                          )}
                        </ul>
                        <MultiSelect
                          options={mokatbatWithDeadLine.map((mokatba: any) => {
                            return {
                              label:
                                mokatba.doc_num +
                                "----" +
                                mokatba.subject +
                                "----" +
                                mokatba?.gehaa?.name,
                              value: mokatba.id,
                            };
                          })}
                          value={selectedMokatbatWithDeadLineForSader}
                          onChange={setSelectedMokatbatWithDeadLineForSader}
                          labelledBy="officers-select-label"
                        />
                      </>
                    )}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-10">
                    <input
                      className="form-check-input"
                      style={{ marginLeft: "10px" }}
                      onChange={(e) => {
                        setLastWaredType(e.target.value);
                      }}
                      value={lastWaredTypesNames.normalWared}
                      type="radio"
                      checked={
                        lastWaredType === lastWaredTypesNames.normalWared
                      }
                    />

                    <label className="form-label">
                      ايماءً الى( وارد اختياري)
                    </label>

                    {lastWaredType === lastWaredTypesNames.normalWared && (
                      <>
                        <RefrenceToLastWared
                          gehaat={gehaat}
                          setLastWaredGeha={setLastWaredGeha}
                          setLastWaredNumber={setLastWaredNumber}
                          setLastWaredYear={setLastWaredYear}
                          lastGehaa={lastWaredGeha}
                          lastWaredNumber={lastWaredNumber}
                          lastWaredYear={lastWaredYear}
                        />
                      </>
                    )}
                  </div>
                </div>
                <hr />
              </>
            )}
          </div>
          <br />
          <div className="row">
            <div className="col-10">
              <input
                className="form-check-input"
                style={{ marginLeft: "10px" }}
                type="checkbox"
                onChange={() => {
                  setIsSaderReferncingAnotherSader(
                    !isSaderReferncingAnotherSader
                  );
                }}
                checked={isSaderReferncingAnotherSader}
              />
              <label className="form-label">الحاقاً الى( صادر اختياري)</label>
              {/* {selectedMokatbatWithDeadLineForSader.map((selectedMokatbaWithDeadLineForSader:any)=>(

              ))} */}
              {isSaderReferncingAnotherSader && (
                <>
                  <RefrenceToLastSader
                    gehaat={gehaat}
                    setLastSaderNumber={setLastSaderNumber}
                    setLastSaderYear={setLastSaderYear}
                    lastSaderNumber={lastSaderNumber}
                    lastSaderYear={lastSaderYear}
                  />
                </>
              )}
            </div>
          </div>

          <br />
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
                      setIsFilePicked(false);
                      if (e.target.files[0]) {
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

                return false;
              };
              if (isReqFieldsFilled()) {
                let formData = new FormData();
                if (saderIdToEdit) {
                  formData.append("saderId", saderIdToEdit);
                }
                if (isSaderReferncingWared) {
                  if (lastWaredType === lastWaredTypesNames.deadLineWared) {
                    formData.append(
                      "selectedMokatbatWithDeadLineForSader",
                      JSON.stringify(selectedMokatbatWithDeadLineForSader)
                    );
                  } else if (
                    lastWaredType === lastWaredTypesNames.normalWared
                  ) {
                    formData.append("lastWaredNumber", lastWaredNumber);

                    formData.append("lastWaredGeha_id", lastWaredGeha.value);
                    formData.append("lastWaredYear", lastWaredYear);
                  }
                }
                if (isSaderReferncingAnotherSader) {
                  formData.append("lastSaderNumber", lastSaderNumber);
                  formData.append("lastSaderYear", lastSaderYear);
                }
                formData.append("doc_num", docNum);
                formData.append("type", type);
                formData.append("doc_date", mokatbaDate);
                formData.append("subject", subject);

                //
                formData.append("lastSaderNumber", lastWaredNumber);
                formData.append("lastSaderYear", lastWaredYear);
                //

                formData.append("gehaat", JSON.stringify(selectedGehaat));
                formData.append("branch_id", selectedBranch.id);
                formData.append("officer_id", selectedOfficer.id);
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
export { SaderForm };
