//{ Express }  is the type
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { routesAssigner } from "./routes/index";
import seqeulize from "./db/seqeulizer";
import "./models/models-relations/index";
import bodyParser from "body-parser";
require("dotenv").config();

seqeulize.sync().then(() => {
  console.log("mysql database is connected");
});

const app: Express = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
// app.use(router)
routesAssigner(app);
app.get("/", (req: Request, res: Response) => {
  res.json("hello from TS");
});
let port: string = process.env.PORT as string;
app.listen(port, () => {
  console.log("app runs on " + port);
});
