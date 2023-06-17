import request from "supertest";
import { app } from "../../app";

describe("GET / ", () => {
  it("return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Hello queque");
  });
});
