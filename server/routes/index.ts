import { Express } from "express";
import waredRouterfrom from "./controllers-routes/waredRoutes";
import saderRouter from "./controllers-routes/saderRoutes";
import homeRouter from "./controllers-routes/homeRoutes";
import authRouter from "./controllers-routes/authRoutes";
import waredOptionsRouter from "./controllers-routes/waredOptionsRoutes";
import saderOptionsRouter from "./controllers-routes/saderOptionsRoutes";
// console.log(routes)

export let routesAssigner = (app: Express): void => {
  app.use("/api/", waredRouterfrom);
  app.use("/api/", saderRouter);
  app.use("/api/", homeRouter);
  app.use("/api/", authRouter);
  app.use("/api/", waredOptionsRouter);
  app.use("/api/", saderOptionsRouter);
  
};

// exports = route_handler
