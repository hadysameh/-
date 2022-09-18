import { WaredForm } from "../../features/wared/components/waredForm";
import axios from "axios";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditWared() {
  let navigate = useNavigate();
  let { mokatbaId } = useParams();
  const requiredFileds = {
    selectedFile: false,
  };
  const submitEditWared = useCallback((formData: FormData) => {
    axios
      .put("/api/waredbox/edit", formData)
      .then((res) => {
        console.log(res);
        console.log("will navigate");
        navigate(`/wared/${mokatbaId}`);
      })
      .catch((err) => {
        alert("فشل في تسجيل المكاتبة الرجاء التحقق من البيانات المدخلة");
        console.log({ err, msg: "error" });
      });
  }, []);
  return (
    <>
      <WaredForm
        submitFormData={submitEditWared}
        requiredFields={requiredFileds}
        waredIdToEdit={mokatbaId}
      />
    </>
  );
}

export default EditWared;
