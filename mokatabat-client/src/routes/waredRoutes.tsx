import NormalWaredBox from "../pages/wared/NormalWaredBox";
import RedCircleWaredBox from "../pages/wared/RedCircleWaredBox";
import GreenCircleWaredBox from "../pages/wared/GreenCircleWaredBox"; 
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateWared from "../pages/wared/CreateWared";
import EditWared from "../pages/wared/EditWared";
import MokatbaDetailsPreview from "../pages/wared/MokatbaDetailsPreview";
//this should be exported to app.js file
let waredRoutes = (
  <>
    <Route
      path="/waredbox"
      element={
        <RedirectIfNotAuth>
          <NormalWaredBox />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/redcirclewaredbox"
      element={
        <RedirectIfNotAuth>
          <RedCircleWaredBox />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/greencirclewaredbox"
      element={
        <RedirectIfNotAuth>
          <GreenCircleWaredBox />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/createwared"
      element={
        <RedirectIfNotAuth>
          <CreateWared />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/wared/edit/:mokatbaId"
      element={
        <RedirectIfNotAuth>
          <EditWared />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/wared/:mokatbaId"
      element={
        <RedirectIfNotAuth>
          <MokatbaDetailsPreview />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default waredRoutes;
