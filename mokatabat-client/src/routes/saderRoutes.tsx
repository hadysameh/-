import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { Route } from "react-router-dom";
import CreateSader from "../pages/sader/CreateSader";
import SaderBox from "../pages/sader/SaderBox";
import SaderDetailsPreview from "../pages/sader/SaderDetailsPreview";
import EditSader from "../pages/sader/EditSader";
//this should be exported to app.js file
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
