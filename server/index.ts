//{ Express }  is the type
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { routesAssigner } from "./routes/index";
import seqeulize from "./db/seqeulize";
import "./models/models-relations/index";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import { router, adminJs } from "./AdminJs";
import Config from "./models/ConfigModel";
import { Server } from "socket.io";
require("dotenv").config();
// seqeulize.sync().then(() => {
//   console.log("seqeulize is in sync with db");
// }).catch((err)=>console.log({err}));

// console.log({ configRow: Config.findAll() });
const app: Express = express();
const server = require("http").createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5022",
    methods: ["GET", "POST"],
   
  }
});

declare global {
  var io: Server;
}
global.io = io;
/**
 * adminjs routes and bodyParser mus be first
 *
 */
app.use(adminJs.options.rootPath, router);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

routesAssigner(app);
app.get("/", (req: Request, res: Response) => {
  res.json("hello from TS");
});
let port: string = process.env.PORT as string;
server.listen(port, () => {
  console.log("app runs on " + port);
});
