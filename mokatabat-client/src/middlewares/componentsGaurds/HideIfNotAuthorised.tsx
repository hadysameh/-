interface IHideIfNotAuthorisedProps {
  condition: boolean;
  children: JSX.Element;
}
function HideIfNotAuthorised({
  condition,
  children,
}: IHideIfNotAuthorisedProps) {
  return <>{condition ? children : ""}</>;
}
export default HideIfNotAuthorised;
