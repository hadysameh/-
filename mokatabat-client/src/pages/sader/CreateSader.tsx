import { SaderForm } from "../../features/sader/components/saderForm";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverApiUrl } from "../../config";
function CreateSader() {
  let navigate = useNavigate();
  const requiredFileds = {
    selectedFile: true,
  };
  const submitNewSader = useCallback((formData: FormData) => {
    axios
      .post(serverApiUrl+"api/saderbox/store", formData)
      .then((res) => {
        console.log(res);
        console.log("will navigate");
        navigate("/saderbox");
      })
      .catch((err) => {
        alert("فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة");
        console.log({ err, msg: "error" });
      });
  }, []);
  return (
    <>
      <SaderForm submitFormDataMethod={submitNewSader} requiredFields={requiredFileds} />
    </>
  );
}

export default CreateSader;
