import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signin } from "../../test/auth-helper";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns status code other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if and invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if and invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "asdfghj",
      price: -10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("create a ticket with valid parameters", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  const title = "asdfas";
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title,
      price: 10,
    })
    .expect(201);
  let savedTickets = await Ticket.find({});
  expect(savedTickets.length).toEqual(1);
});
