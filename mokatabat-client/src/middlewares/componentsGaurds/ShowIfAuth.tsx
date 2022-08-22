import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/user/stores/userSlice";
interface IShowIfAuth {
  children: JSX.Element;
}
function ShowIfAuth({ children }: IShowIfAuth) {
  const token = useSelector(selectUserType);
  useEffect(() => {
    console.log({ token });
  }, [token]);
  return <>{token ? children : ""}</>;
}
export default ShowIfAuth;
