import { UserAccessMemory } from "./memory/dao/userDao.js";
import mongoConnect from "../persistence/mongoDB/dao/connection.js";
import { userModelMongo } from "../persistence/mongoDB/models/userModel.js";
import { productModelMongo } from "../persistence/mongoDB/models/productModel.js";
import { ticketModelMongo } from "../persistence/mongoDB/models/ticketModel.js";
import { cartModelMongo } from "../persistence/mongoDB/models/cartModel.js";
import TicketAccessMongo from "../persistence/mongoDB/dao/ticketDao.js";
import CartAccessMongo from "../persistence/mongoDB/dao/cartDao.js";
import ProductAccessMongo from "../persistence/mongoDB/dao/productDao.js";
import UserAccessMongo from "../persistence/mongoDB/dao/userDao.js";

const persistenceConfig = {
  "--mongo": {
    init: () => mongoConnect.getInstance(),
    userDAO: new UserAccessMongo(),
    productDAO: new ProductAccessMongo(),
    ticketDAO: new TicketAccessMongo(),
    cartDAO: new CartAccessMongo(),
    models: {
      userModel: userModelMongo,
      productModel: productModelMongo,
      ticketModel: ticketModelMongo,
      cartModel: cartModelMongo,
    },
  },
  "--memory": {
    init: () => console.log("Utilizando persistencia memory"),
    userDAO: new UserAccessMemory(),
    // Define los otros DAOs y modelos para la persistencia en memoria aquí si los necesitas.
    models: {
      // userModel: userModelMemory,
      // productModel: productModelMemory,
      // ticketModel: ticketModelMemory,
      // cartModel: cartModelMemory,
    },
  },
};

const persistence = process.argv[2] || "--mongo";
const config = persistenceConfig[persistence];

const {
  init: persistenceDaoInit,
  userDAO,
  productDAO,
  ticketDAO,
  cartDAO,
  models,
} = config;
const { userModel, productModel, ticketModel, cartModel } = models;

export {
  persistenceDaoInit,
  userDAO,
  productDAO,
  ticketDAO,
  cartDAO,
  userModel,
  productModel,
  ticketModel,
  cartModel,
};
