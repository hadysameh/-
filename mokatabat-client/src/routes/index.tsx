import WaredBox from "../pages/wared/WaredBox";
import Header from "../components/Header";
import RedirectIfAuth from "../middlewares/routesMiddlewares/RedirectIfAuth";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/HomePage";
import { Login, Logout, Register } from "../features/user";
import CreateWared from "../pages/wared/CreateWared";
import EditWared from "../pages/wared/EditWared";
import MokatbaDetailsPreview from "../pages/wared/MokatbaDetailsPreview";
import CreateSader from "../pages/sader/CreateSader";
import SaderBox from "../pages/sader/SaderBox";
//this should be exported to app.js file
let routes = (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfNotAuth>
            <Home />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/waredbox"
        element={
          <RedirectIfNotAuth>
            <WaredBox />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/logout"
        element={
          <RedirectIfNotAuth>
            <Logout />
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
    </Routes>
  </BrowserRouter>
);
export default routes;
