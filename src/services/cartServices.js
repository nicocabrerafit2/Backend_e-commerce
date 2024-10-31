import { CartRepository } from "../repositories/index.js";
import basicServices from "./basicServices.js";
import validationError from "../middlewares/ValidationError.js";
import { v4 as uuidv4 } from "uuid";

class CartService extends basicServices {
  constructor() {
    super(CartRepository);
  }
  async create(userId) {
    try {
      const newCart = {
        user: userId,
        products: [],
        status: "active",
      };
      return await this.repository.create(newCart);
    } catch (error) {
      throw new Error(error);
    }
  }
  async addProductInCart(cartId, productId) {
    try {
      const cart = await super.getById(cartId);
      if (!cart) {
        throw new validationError(
          "Ese carrito no se encuentra en la base de datos",
          404
        );
      }
      const productExistInCart = cart.products.find(
        (item) => item.product.toString() === productId
      );
      if (productExistInCart) {
        productExistInCart.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await super.update(cartId, cart);
      return {
        message: productExistInCart
          ? `Se agregó una unidad más del producto con id: ${productId} al carrito con id: ${cartId}`
          : `Se agregó el producto con id: ${productId} al carrito con id: ${cartId}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateQuantityProductInCart(cartId, productId, quantity) {
    try {
      const cart = await super.getById(cartId);
      if (!cart) {
        throw new validationError(
          "Ese carrito no se encuentra en la base de datos",
          404
        );
      }

      const productExistInCart = cart.products.find(
        (item) => item.product.toString() === productId
      );
      if (!productExistInCart) {
        throw new validationError(
          "El producto no se encuentra en el carrito",
          404
        );
      }

      productExistInCart.quantity = quantity;
      await super.update(cartId, cart);
      return {
        message: `Cantidad del producto con id: ${productId} actualizada a ${quantity} en el carrito con id: ${cartId}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await super.getById(cartId);
      if (!cart) {
        throw new validationError(
          "Ese carrito no se encuentra en la base de datos",
          404
        );
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new validationError(
          "El producto no se encuentra en el carrito",
          404
        );
      }

      cart.products.splice(productIndex, 1);
      await super.update(cartId, cart);
      return {
        message: `El producto con id: ${productId} ha sido eliminado del carrito con id: ${cartId}`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async purchaseCart(cartId, productService, ticketService, user) {
    try {
      const cart = await super.getById(cartId);
      if (!cart) {
        throw new validationError("Carrito no encontrado", 404);
      }

      for (let item of cart.products) {
        const product = await productService.getById(item.product);

        if (product.stock < item.quantity) {
          throw new validationError(
            "No hay suficiente stock para el producto con id: " + item.product,
            400
          );
        }
      }
      let totalAmount = 0;
      for (let item of cart.products) {
        const product = await productService.getById(item.product);
        product.stock -= item.quantity;
        await product.save();
        totalAmount += product.price * item.quantity;
      }
      cart.status = "completed";
      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: user.email,
        products: cart.products,
        cart: cartId,
      };
      cart.products = [];
      await cart.save();
      return await ticketService.create(newTicket);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartService;
