import supertest from "supertest";
import Server from "../Server";

const config = {
  mongoUri: "mongodb://localhost:27017/basic-svc",
  nodeEnv: "test",
  port: "8585",
};

const server = new Server(config);
let request: any;

describe("Test Cases", () => {
  beforeAll((done) => {
    server.init().then(() => {
      request = supertest(server.app);
      done();
    });
  });

  it("should create a user", async () => {
    const response = await request
      .get("/health-check")
      .set("Accept", "application/json");
    // .expect("Content-Type", "application/json; charset=utf-8");
    console.log(
      "res...........",
      response.body,
      response.data,
      response.status
    );
    // expect(response.body).toBe("aa");
  });
});
