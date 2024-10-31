import { UserAccessMemory } from "./memory/dao/userDao.js";
import mongoConennect from "../persistence/mongoDB/dao/connection.js";
import { userModelMongo } from "../persistence/mongoDB/models/userModel.js";
import { productModelMongo } from "../persistence/mongoDB/models/productModel.js";
import { ticketModelMongo } from "../persistence/mongoDB/models/ticketModel.js";
import { cartModelMongo } from "../persistence/mongoDB/models/cartModel.js";
import TicketAccessMongo from "../persistence/mongoDB/dao/ticketDao.js";
import CartAccessMongo from "../persistence/mongoDB/dao/cartDao.js";
import ProductAccessMongo from "../persistence/mongoDB/dao/productDao.js";
import UserAccessMongo from "../persistence/mongoDB/dao/userDao.js";
let persistenceDaoInit;
let userDAO;
let userModel;
let productDAO;
let productModel;
let cartModel;
let ticketModel;
let cartDAO;
let ticketDAO;
const persistence = process.argv[2];

switch (persistence) {
  case "--mongo":
    persistenceDaoInit = function () {
      return mongoConennect.getInstance();
    };
    userDAO = new UserAccessMongo();
    productDAO = new ProductAccessMongo();
    ticketDAO = new TicketAccessMongo();
    cartDAO = new CartAccessMongo();
    productModel = productModelMongo;
    userModel = userModelMongo;
    ticketModel = ticketModelMongo;
    cartModel = cartModelMongo;

    //metodo singleton para conexion a mongo
    break;
  case "--memory":
    persistenceDaoInit = function () {
      return console.log("Utilizando persistencia memory");
    };
    userDAO = new UserAccessMemory();
    // productModel = productModelMemory;
    // userModel = userModelMemory;
    // ticketModel = ticketModelMemory;
    // cartModel = cartModelMemory;
    // productDAO = new ProductAccessMemory();
    // ticketDAO = new TicketAccessMemory();
    // cartDAO = new CartAccessMemory();

    break;
  default:
    persistenceDaoInit = function () {
      return mongoConennect.getInstance();
    };
    userDAO = new UserAccessMongo();
    productDAO = new ProductAccessMongo();
    ticketDAO = new TicketAccessMongo();
    cartDAO = new CartAccessMongo();
    productModel = productModelMongo;
    userModel = userModelMongo;
    ticketModel = ticketModelMongo;
    cartModel = cartModelMongo;
    break;
}

export {
  persistenceDaoInit,
  userDAO,
  productDAO,
  ticketDAO,
  cartDAO,
  productModel,
  userModel,
  ticketModel,
  cartModel,
};
