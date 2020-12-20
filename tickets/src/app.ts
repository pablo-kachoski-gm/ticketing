import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@pkticketing/common";
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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
