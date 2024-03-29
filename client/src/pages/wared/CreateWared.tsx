import { WaredForm } from "../../features/wared/components/waredForm";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateWared() {
  let navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  const requiredFileds = {
    selectedFile: true,
  };
  const submitNewWared = useCallback((formData: FormData) => {
    axios
      .post("/api/waredbox/store", formData)
      .then((res) => {
        console.log(res);
        // console.log("will navigate");
        // alert(res)
        navigate("/waredbox");
      })
      .catch((err) => {
        alert(
          " ,فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة\n" +
            String(err)
        );
        console.log({ err, msg: "error" });
      });
  }, []);
  return (
    <>
      <WaredForm
        submitFormData={submitNewWared}
        requiredFields={requiredFileds}
      />
    </>
  );
}

export default CreateWared;
