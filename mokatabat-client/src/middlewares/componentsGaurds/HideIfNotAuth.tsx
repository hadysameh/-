import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/user/stores/userSlice";
interface IHideIfNotAuthorisedProps {
  children: JSX.Element;
}
function HideIfNotAuth({ children }: IHideIfNotAuthorisedProps) {
  const token = useSelector(selectToken);
  useEffect(() => {
    console.log({ token });
  }, [token]);
  return <>{token ? children : ""}</>;
}
export default HideIfNotAuth;
