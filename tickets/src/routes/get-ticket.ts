import express, { Request, Response } from "express";
import { NotFoundError } from "@pkticketing/common";
import { Ticket } from "../models/ticket";
const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const ticket = Ticket.findById(ticketId);
  if (!ticket) throw new NotFoundError();
  res.send(ticket);
});
export { router as createTicketRouter };
