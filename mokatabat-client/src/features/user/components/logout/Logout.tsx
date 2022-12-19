import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeAuthData, selectUserType } from "../../stores/userSlice";
import { useSelector, useDispatch } from "react-redux";
export function Logout() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(removeAuthData());

    // @ts-ignore
    window.bc.postMessage({ type: "loggedout" });
    navigate("/login");
  }, []);

  return <></>;
}
