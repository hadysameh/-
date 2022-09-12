"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesAssigner = void 0;
const waredRoutes_1 = __importDefault(require("./controllers-routes/waredRoutes"));
const saderRoutes_1 = __importDefault(require("./controllers-routes/saderRoutes"));
const homeRoutes_1 = __importDefault(require("./controllers-routes/homeRoutes"));
const authRoutes_1 = __importDefault(require("./controllers-routes/authRoutes"));
const waredOptionsRoutes_1 = __importDefault(require("./controllers-routes/waredOptionsRoutes"));
const saderOptionsRoutes_1 = __importDefault(require("./controllers-routes/saderOptionsRoutes"));
const waredTrackingOfficers_1 = __importDefault(require("./controllers-routes/waredTrackingOfficers"));
const saderTrackingOfficers_1 = __importDefault(require("./controllers-routes/saderTrackingOfficers"));
// console.log(routes)
let routesAssigner = (app) => {
    app.use("/api/", waredRoutes_1.default);
    app.use("/api/", saderRoutes_1.default);
    app.use("/api/", homeRoutes_1.default);
    app.use("/api/", authRoutes_1.default);
    app.use("/api/", waredOptionsRoutes_1.default);
    app.use("/api/", saderOptionsRoutes_1.default);
    app.use("/api/", waredTrackingOfficers_1.default);
    app.use("/api/", saderTrackingOfficers_1.default);
};
exports.routesAssigner = routesAssigner;
// exports = route_handler
