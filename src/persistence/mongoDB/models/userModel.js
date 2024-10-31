import { model, Schema } from "mongoose";

const userCollection = "users";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  rol: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    require: true,
  },
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
  ],
});

const userModelMongo = model(userCollection, userSchema);

export { userModelMongo };
