import WaredBox from "../pages/wared/WaredBox";
import Header from "../components/Header";
import RedirectIfAuth from "../middlewares/routesMiddlewares/RedirectIfAuth";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/HomePage";
 import {Login,Logout,Register} from '../features/user' 
//this should be exported to app.js file
let routes = (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/"
        element={
          <RedirectIfNotAuth>
           <Home/>
          </RedirectIfNotAuth>
        }
      />
      {/* wared pages */}

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
            <Login/>
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
      {/* <Route
        path="/wared/:mokatbaId"
        element={
          <RedirectIfNotAuth>
            <MokatbaPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/wared/edit/:mokatbaId"
        element={
          <RedirectIfNotAuth>
            <EditWaredPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/mokatbapdf/:mokatbaId"
        element={
          <RedirectIfNotAuth>
            <MokatbaPdfPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/createwared"
        element={
          <RedirectIfNotAuth>
            <CreateWaredPage />
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
            <SaderPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/sader/edit/:saderId"
        element={
          <RedirectIfNotAuth>
            <EditSaderPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/createsader"
        element={
          <RedirectIfNotAuth>
            <CreateSaderPage />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/redcircle"
        element={
          <RedirectIfNotAuth>
            <RedCircle />
          </RedirectIfNotAuth>
        }
      />
      <Route
        path="/greencircle"
        element={
          <RedirectIfNotAuth>
            <GreenCircle />
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
        path="/register"
        element={
          <RedirectIfAuth>
            <Register />
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

      {/*<Route path="/sader/edit/:mokatbaId" element={<EditWaredPage/>} />
      <Route path="/saderpdf/:mokatbaId" element={<MokatbaPdfPage/>} />
      <Route path="/createsader" element={<CreateWaredPage/>} /> */}
    </Routes>
  </BrowserRouter>
);
export default routes;
