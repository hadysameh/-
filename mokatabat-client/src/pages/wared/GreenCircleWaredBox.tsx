import { useEffect } from "react";
import { WaredBox } from "../../features/wared/components/waredBox";
import { waredBoxType } from "../../types";

function GreenCircleWaredBox() {
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
    // cancel the request
  }, []);
  return <WaredBox waredBoxType={waredBoxType.green} />;
}

export default GreenCircleWaredBox;
