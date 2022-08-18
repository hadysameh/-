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

require("dotenv").config();
// seqeulize.sync().then(() => {
//   console.log("seqeulize is in sync with db");
// });
const app: Express = express();
//adminjs routes and bod parser mus be first

app.use(adminJs.options.rootPath, router);
app.use(bodyParser())
app.use(bodyParser.json())
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
app.listen(port, () => {
  console.log("app runs on " + port);
});
