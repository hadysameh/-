//{ Express }  is the type
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { routesAssigner } from "./routes/index";
import sequelize from "./db/seqeulize";

import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
//@ts-ignore
import { router, adminJs } from "./AdminJs";
import { Server } from "socket.io";
require("dotenv").config();
sequelize
  .authenticate()
  .then(async () => {
    console.log("sequelize is authenticated with db");
    await import("./models/models-relations");
  })
  .catch((err) => console.log({ err }));

const app: Express = express();
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5022",
    methods: ["GET", "POST"],
  },
});

declare global {
  var io: Server;
}
global.io = io;
/**
 * adminjs routes and bodyParser mus be first
 *
 */

//@ts-ignore
app.use(adminJs.options.rootPath, router);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(cookieParser());

routesAssigner(app);
const nodeEnviromment = process.env.NODE_ENV as string;
if (nodeEnviromment == "production") {
  app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
  // app.use(express.static(path.join(__dirname, "../../client/build/static")));
  app.get("/*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });
}

let port: string = process.env.PORT as string;
server.listen(port, () => {
  console.log("app runs on " + port);
});
