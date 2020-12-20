import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/auth-helper";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app).get("/api/tickets/asdadasdd").send({});
  expect(response.status).not.toEqual(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 20;
  const createResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title, price })
    .expect(201);

  const getResponse = await request(app)
    .get(`/api/tickets/${createResponse.body.id}`)
    .send({ title, price })
    .expect(200);

  expect(getResponse.body.title).toEqual(title);
  expect(getResponse.body.price).toEqual(price);
});
