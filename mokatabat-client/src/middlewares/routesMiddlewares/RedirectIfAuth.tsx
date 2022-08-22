import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserType } from "../../features/user/stores/userSlice";

interface IRedirectIfNotAuthProps {
  children: JSX.Element;
}
function RedirectIfAuth({
  children,
}: IRedirectIfNotAuthProps) {
  const navigate = useNavigate();
  const token = useSelector(selectUserType)
  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, [token]);
  return <>{children}</>;
}
export default RedirectIfAuth;
