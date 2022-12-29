interface IHasAccessToShowComponent {
  condition: boolean;
  children: JSX.Element;
}
/**
 * used to wrap jsx to show only if the user has premission to see it
 * @returns 
 */
function HasAccessToShowComponent({
  condition,
  children,
}: IHasAccessToShowComponent) {
  return <>{condition ? children : ""}</>;
}
export default HasAccessToShowComponent;
