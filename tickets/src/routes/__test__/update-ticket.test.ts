import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { signin } from "../../test/auth-helper";
const createTicket = (cookie = signin()) => {
  const title = "concert";
  const price = 20;
  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price });
};
it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({
      title: "asdfghj",
      price: 20,
    });
  expect(response.status).toEqual(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).put(`/api/tickets/${id}`).send({
    title: "asdfghj",
    price: 20,
  });
  expect(response.status).toEqual(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const createdTicket = await createTicket();
  const response = await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", signin())
    .send({
      title: "asdfghj",
      price: 20,
    });
  expect(response.status).toEqual(401);
});

it("returns a 400 if the user provides and invalid title or price", async () => {
  const cookie = signin();
  const createdTicket = await createTicket(cookie);
  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", signin())
    .send({
      title: "asdfghj",
      price: -20,
    })
    .expect(400);
});

it("returns updated ticket", async () => {
  const cookie = signin();

  const createdTicket = await createTicket(cookie);
  await request(app)
    .put(`/api/tickets/${createdTicket.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 100,
    })
    .expect(200);
  const response = await request(app)
    .get(`/api/tickets/${createdTicket.body.id}`)
    .send();
  expect(response.body.title).toEqual("new title");
  expect(response.body.price).toEqual(100);
});
