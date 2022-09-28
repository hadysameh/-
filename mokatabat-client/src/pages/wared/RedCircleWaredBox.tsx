import { WaredBox } from "../../features/wared/components/waredBox";
import { waredBoxType } from "../../types";
import { useEffect } from "react";

function RedCircleWaredBox() {
  
useEffect(() => {
  const controller = new AbortController();
  return () => {
    controller.abort();
  };
  // cancel the request
}, []);
  return <WaredBox waredBoxType={waredBoxType.red} />;
}

export default RedCircleWaredBox;
