import CartService from "../services/cartServices.js";
import ProductService from "../services/productServices.js";
import TicketService from "../services/ticketServices.js";
import basicController from "./basicController.js";
import { createResponse } from "../utils/utils.js";
const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();
class CartController extends basicController {
  constructor() {
    super(cartService);
    this.productService = productService;
    this.ticketService = ticketService;
  }
  addProductInCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const data = await this.service.addProductInCart(cartId, productId);
      createResponse(
        res,
        !data ? 404 : 200,
        !data
          ? {
              message: "No se puede agregar el producto al carrito",
            }
          : data
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
  updateQuantityProductInCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      const data = await this.service.updateQuantityProductInCart(
        cartId,
        productId,
        quantity
      );
      if (!data) {
        createResponse(res, 404, {
          message: "No se pudo agregar o quitar unidades",
        });
      } else {
        createResponse(res, !data ? 404 : 200, data);
      }
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
  deleteProductFromCart = async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const data = await this.service.deleteProductFromCart(cartId, productId);
      if (!data) {
        createResponse(res, 404, {
          message: "No se pudo eliminar el producto del carrito",
        });
      } else {
        createResponse(res, !data ? 404 : 200, data);
      }
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
  purchaseCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const user = req.body;
      const data = await this.service.purchaseCart(
        cartId,
        this.productService,
        this.ticketService,
        user
      );

      if (!data) {
        createResponse(res, 404, {
          message: "No se pudo realizar la compra",
        });
      } else {
        createResponse(res, !data ? 404 : 200, data);
      }
    } catch (error) {
      const statusCode = error.statusCode || 500;
      createResponse(res, statusCode, error.message);
    }
  };
}

export default CartController;
