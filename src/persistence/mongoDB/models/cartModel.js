import { Schema, model } from "mongoose";
const cartCollection = "carts";
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "completed"], // Posibles valores para el estado del carrito
    default: "active",
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "tickets",
  },
});
const cartModelMongo = model(cartCollection, cartSchema);

export { cartModelMongo };
