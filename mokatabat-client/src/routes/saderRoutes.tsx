import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const CreateSader = lazy(() => import("../pages/sader/CreateSader"));
const SaderBox = lazy(() => import("../pages/sader/SaderBox"));
const SaderDetailsPreview = lazy(() =>
  import("../pages/sader/SaderDetailsPreview")
);
const EditSader = lazy(() => import("../pages/sader/EditSader"));

let saderRoutes = (
  <>
    <Route
      path="/createsader"
      element={
        <RedirectIfNotAuth>
          <CreateSader />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/saderbox"
      element={
        <RedirectIfNotAuth>
          <SaderBox />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/sader/:saderId"
      element={
        <RedirectIfNotAuth>
          <SaderDetailsPreview />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/sader/edit/:saderId"
      element={
        <RedirectIfNotAuth>
          <EditSader />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default saderRoutes;
