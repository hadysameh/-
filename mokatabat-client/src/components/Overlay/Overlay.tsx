import "./style.css";
import { useEffect, useRef } from "react";
interface IProps {
  isOpen: boolean;
  setIsWaredOverlayOpen(isOpen: boolean): void;
  children: JSX.Element;
}
export default function Overlay(props: IProps) {
  const overlayRef = useRef<any>();

  const openSearch = () => {
    overlayRef.current.style.width = "100%";
  };

  // This function is called when the "Close" button is clicked
  const closeSearch = () => {
    props.setIsWaredOverlayOpen(false);
    overlayRef.current.style.width = "0%";
  };
  useEffect(() => {
    if (props.isOpen) {
      openSearch();
    } else {
      closeSearch();
    }
    // console.log({'isoverlayOpen':props.isOpen})
    return () => {};
  }, [props.isOpen]);
  return (
    <>
      {/* <div className="container"> */}
        <div ref={overlayRef} className="overlay">
          <button className="close-button" onClick={closeSearch}>
            &times;
          </button>
          <div className="overlay-content container">{props.children}</div>
        </div>
      {/* </div> */}
    </>
  );
}
