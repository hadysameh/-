import { Express } from "express";
// import waredRouterfrom from "./controllers-routes/waredRoutes";
// import saderRouter from "./controllers-routes/saderRoutes";
// import homeRouter from "./controllers-routes/homeRoutes";
// import authRouter from "./controllers-routes/authRoutes";
// import waredOptionsRouter from "./controllers-routes/waredOptionsRoutes";
// import saderOptionsRouter from "./controllers-routes/saderOptionsRoutes";
// import waredTrackingOfficersRouter from "./controllers-routes/waredTrackingOfficers";
// import SaderTrackingOfficersRouter from "./controllers-routes/saderTrackingOfficers";
import { saderRouter } from "../features/sader";
import { waredRouter } from "../features/wared";
import { homeRouter } from "../features/home";
import { authRouter } from "../features/auth";
// console.log(routes)

export let routesAssigner = (app: Express): void => {
  app.use("/api/", saderRouter);
  app.use("/api/", waredRouter);
  app.use("/api/", homeRouter);
  app.use("/api/", authRouter); 
};

