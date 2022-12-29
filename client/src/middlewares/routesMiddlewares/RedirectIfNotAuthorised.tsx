import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface IRedirectIfNotAuthorisedProps {
  condition: boolean;
  children: JSX.Element;
}
function RedirectIfNotAuthorised({
  condition,
  children,
}: IRedirectIfNotAuthorisedProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!condition) {
      return navigate("/login");
    }
  }, []);
  return <>{children}</>;
}
export default RedirectIfNotAuthorised;
