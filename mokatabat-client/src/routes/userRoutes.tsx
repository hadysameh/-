import RedirectIfAuth from "../middlewares/routesMiddlewares/RedirectIfAuth";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Logout, Register } from "../features/user"; 
//this should be exported to app.js file
let userRoutes = (
  <>
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
      path="/register"
      element={
        <RedirectIfAuth>
          <Register />
        </RedirectIfAuth>
      }
    />
  </>
);
export default userRoutes;
