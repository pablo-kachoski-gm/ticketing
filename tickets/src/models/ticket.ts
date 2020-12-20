import { Schema, model, Model, Document } from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

interface TicketDoc extends Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
ticketSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.__v;
  },
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
