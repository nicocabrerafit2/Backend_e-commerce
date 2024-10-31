import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketCollection = "tickets";

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: uuidv4, // Genera un UUID único por defecto
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    required: true,
  },
});

const ticketModelMongo = model(ticketCollection, ticketSchema);
export { ticketModelMongo };
