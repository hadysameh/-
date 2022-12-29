import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserType } from "../../features/user/stores/userSlice";

interface IHideIfAuth {
  children: JSX.Element;
}
function ShowIfNotAuth({ children }: IHideIfAuth) {
  const token = useSelector(selectUserType);
  useEffect(() => {
    console.log({ token });
  }, [token]);

  return <>{token ? "" : children}</>;
}
export default ShowIfNotAuth;
