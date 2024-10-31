import mongoDao from "./basicDao.js";
import { cartModelMongo } from "../models/cartModel.js";

class CartAccessMongo extends mongoDao {
  constructor() {
    super(cartModelMongo);
  }
}

export default CartAccessMongo;
