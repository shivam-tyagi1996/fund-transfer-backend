import supertest from "supertest";
import Server from "../Server";

const config = {
  mongoUri: "mongodb://localhost:27017/db",
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

  it("health-check route", async () => {
    const response = await request
      .get("/health-check")
      .set("Accept", "application/json");

      expect(response.status).toBe(200);
  });
  it("fund transfer successful", async () => {
    const response = await request
      .post("/api/transfer")
      .send({
        "amount": 500,
        "originAccount": "123",
        "destinationAccount": "123"
      })
      .set("Accept", "application/json");
      console.log(response.body);
      expect(response.status).toBe(200);
  });
  it("fund transfer fail", async () => {
    const response = await request
      .post("/api/transfer")
      .send({
        "amount": 50000,
        "originAccount": "123",
        "destinationAccount": "123"
      })
      .set("Accept", "application/json");

      expect(response.status).toBe(400);
  });
});
