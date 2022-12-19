"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesAssigner = void 0;
// import waredRouterfrom from "./controllers-routes/waredRoutes";
// import saderRouter from "./controllers-routes/saderRoutes";
// import homeRouter from "./controllers-routes/homeRoutes";
// import authRouter from "./controllers-routes/authRoutes";
// import waredOptionsRouter from "./controllers-routes/waredOptionsRoutes";
// import saderOptionsRouter from "./controllers-routes/saderOptionsRoutes";
// import waredTrackingOfficersRouter from "./controllers-routes/waredTrackingOfficers";
// import SaderTrackingOfficersRouter from "./controllers-routes/saderTrackingOfficers";
const sader_1 = require("../features/sader");
const wared_1 = require("../features/wared");
const home_1 = require("../features/home");
const auth_1 = require("../features/auth");
// console.log(routes)
let routesAssigner = (app) => {
    app.use("/api/", sader_1.saderRouter);
    app.use("/api/", wared_1.waredRouter);
    app.use("/api/", home_1.homeRouter);
    app.use("/api/", auth_1.authRouter);
};
exports.routesAssigner = routesAssigner;
