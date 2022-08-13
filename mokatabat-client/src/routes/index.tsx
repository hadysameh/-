import Header from "../components/Header";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/HomePage"; 
import waredRoutes from "./waredRoutes";
import saderRoutes from "./saderRoutes";
import userRoutes from "./userRoutes";
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
    </Routes>
  </BrowserRouter>
);
export default routes;
