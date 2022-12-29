import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../features/user/stores/userSlice";

interface IRedirectIfNotAuthProps {
  children: JSX.Element;
}
function RedirectIfNotAuth({ children }: IRedirectIfNotAuthProps) {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
}
export default RedirectIfNotAuth;
