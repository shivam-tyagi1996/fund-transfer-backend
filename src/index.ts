import Server from "./Server";

const server = new Server({
  mongoUri: "mongodb://localhost:27017/db",
  port: 4000,
});

server.init().then(() => {
  server.start();
});
