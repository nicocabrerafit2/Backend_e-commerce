import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: Array,
    require: true,
  },
});
productSchema.plugin(mongoosePaginate);
const productModelMongo = model(productCollection, productSchema);

export { productModelMongo };
