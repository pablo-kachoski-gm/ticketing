import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@pkticketing/common";
import { createTicketRouter } from "./routes/create-ticket";

const app = express();
//Enable proxy - Ingress
app.set("trust proxy", true);
app.use(json());
//Disable encryption && enable https only
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
