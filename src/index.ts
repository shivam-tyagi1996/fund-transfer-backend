// import express from "express";
// import bodyParser from "body-parser";

// import { Login } from "./controller";
// import { errorHandler } from "./helper";
// import router from "./router";

// const app = express();
// const port = 3000;
// const login = Login.getInstance();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/health-check", (req: any, res: any) => {
//   res.send({ message: "Welcome to Fund Management Application." });
// });

// app.post("/login", login.checkLogin);

// app.all("*", login.checkToken);
// app.use("/api", router);

// app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

import Server from "./Server";

const server = new Server({
  mongoUri: "mongodb://localhost:27017/db",
  port: 4000,
});

server.init().then(() => {
  server.start();
});
