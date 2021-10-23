import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { Login } from "./controller";
import { errorHandler } from "./helper";
import Database from "./helper/Database";
import router from "./router";

class Server {
  public app: express.Express;
  private login: Login = Login.getInstance();

  constructor(private configurations: any) {
    this.app = express();
  }

  public async init() {
    await Database.open(this.configurations.mongoUri);
    this.initCors();
    this.initJsonParser();
    this.setupRoutes();
  }

  public start() {
    this.app.listen(this.configurations.port, () => {
      console.log(
        `Server started listening at port ${this.configurations.port}`
      );
    });
  }

  private initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initCors() {
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        origin: "*",
      })
    );
  }

  private setupRoutes() {
    this.app.get("/health-check", (req: any, res: any) => {
      res
        .status(200)
        .send({ message: "Welcome to Fund Management Application." });
    });

    this.app.post("/login", this.login.checkLogin);

    this.app.all("*", this.login.checkToken);
    this.app.use("/api", router);
    this.app.use(errorHandler);
  }
}

export default Server;
