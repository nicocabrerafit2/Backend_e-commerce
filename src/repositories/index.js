import {
  userDAO,
  productDAO,
  cartDAO,
  ticketDAO,
} from "../persistence/factory.js";
import userRepository from "./userRepository.js";
import productRepository from "./productRepository.js";
import cartRepository from "./cartRepository.js";
import ticketRepository from "./ticketRepository.js";

export const UserRepository = new userRepository(userDAO);
export const ProductRepository = new productRepository(productDAO);
export const CartRepository = new cartRepository(cartDAO);
export const TicketRepository = new ticketRepository(ticketDAO);
