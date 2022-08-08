import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/user/stores/userSlice";

interface IHideIfAuth {
  children: JSX.Element;
}
function HideIfAuth({ children }: IHideIfAuth) {
  const token = useSelector(selectToken);
  useEffect(() => {
    console.log({ token });
  }, [token]);

  return <>{token ? "" : children}</>;
}
export default HideIfAuth;
