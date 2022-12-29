import { SaderForm } from "../../features/sader/components/saderForm";
import axios from "axios";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditSader() {
  let navigate = useNavigate();
  let { saderId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  const submitEditWared = useCallback((formData: FormData) => {
    axios
      .put("/api/saderbox/edit", formData)
      .then((res) => {
        navigate(`/sader/${saderId}`);
      })
      .catch((err) => {
        alert("فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة");
        console.log({ err, msg: "error" });
      });
  }, []);
  const requiredFileds = {
    selectedFile: false,
  };
  return (
    <>
      <SaderForm
        submitFormDataMethod={submitEditWared}
        requiredFields={requiredFileds}
        saderIdToEdit={saderId}
      />
    </>
  );
}

export default EditSader;
