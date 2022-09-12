"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//{ Express }  is the type
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const seqeulize_1 = __importDefault(require("./db/seqeulize"));
require("./models/models-relations/index");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AdminJs_1 = require("./AdminJs");
const socket_io_1 = require("socket.io");
require("dotenv").config();
seqeulize_1.default
    .sync()
    .then(() => {
    console.log("seqeulize is in sync with db");
})
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
app.use(express_1.default.static("../mokatabat-client/build"));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../mokatabat-client/build/index.html"));
    // res.sendFile('../mokatabat-client/build/index.html')
    // res.json("hello from TS");
});
let port = process.env.PORT;
server.listen(port, () => {
    console.log("app runs on " + port);
});
