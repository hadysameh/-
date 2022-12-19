"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//{ Express }  is the type
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const seqeulize_1 = __importDefault(require("./db/seqeulize"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//@ts-ignore
const AdminJs_1 = require("./AdminJs");
const socket_io_1 = require("socket.io");
require("dotenv").config();
// sequelize
//   .sync({alter:true})
//   .then(() => {
//     console.log("sequelize is in sync with db");
//   })
//   .catch((err) => console.log({ err }));
seqeulize_1.default
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sequelize is authenticated with db");
    yield Promise.resolve().then(() => __importStar(require("./models/models-relations")));
}))
    .catch((err) => console.log({ err }));
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5022",
        methods: ["GET", "POST"],
    },
});
global.io = io;
/**
 * adminjs routes and bodyParser mus be first
 *
 */
//@ts-ignore
app.use(AdminJs_1.adminJs.options.rootPath, AdminJs_1.router);
app.use((0, body_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.raw());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use((0, cookie_parser_1.default)());
(0, index_1.routesAssigner)(app);
// app.get("/", (req: Request, res: Response) => {
//   res.json("hello from TS");
// });
const nodeEnviromment = process.env.NODE_ENV;
if (nodeEnviromment == "production") {
    app.use(express_1.default.static("../mokatabat-client/build"));
    app.get("/*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../mokatabat-client/build/index.html"));
    });
}
let port = process.env.PORT;
server.listen(port, () => {
    console.log("app runs on " + port);
});
