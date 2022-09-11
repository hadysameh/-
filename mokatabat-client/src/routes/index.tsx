import Header from "../components/Header";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/HomePage";
import waredRoutes from "./waredRoutes";
import saderRoutes from "./saderRoutes";
import userRoutes from "./userRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ForeOtherRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/')
  });
  return <></>
};
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
      {waredRoutes}
      {saderRoutes}
      {userRoutes}
      <Route
        path="/*"
        element={
          <RedirectIfNotAuth>
            <ForeOtherRoutes />
          </RedirectIfNotAuth>
        }
      />
    </Routes>
  </BrowserRouter>
);
export default routes;
