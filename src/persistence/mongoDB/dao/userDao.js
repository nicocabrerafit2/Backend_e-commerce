import mongoDao from "./basicDao.js";
import { userModelMongo } from "../models/userModel.js";

class UserAccessMongo extends mongoDao {
  constructor() {
    super(userModelMongo);
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email }).lean();
    } catch (error) {
      throw new Error(error);
    }
  }
  async getById(id) {
    try {
      return await this.model.findById(id).populate({
        path: "carts",
        populate: {
          path: "products.product",
          model: "products",
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      return await this.model.find({}).populate({
        path: "carts",
        populate: {
          path: "products.product",
          model: "products",
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserAccessMongo;
