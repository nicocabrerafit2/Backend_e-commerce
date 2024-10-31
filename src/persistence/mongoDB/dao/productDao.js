import mongoDao from "./basicDao.js";
import { productModelMongo } from "../models/productModel.js";

class ProductAccessMongo extends mongoDao {
  constructor() {
    super(productModelMongo);
  }
}

export default ProductAccessMongo;
