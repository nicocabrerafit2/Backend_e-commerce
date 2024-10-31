import CartController from "../controllers/cartController.js";
import BasicRouter from "./basicRouter.js";

const cartController = new CartController();

export default class CartRouter extends BasicRouter {
  init() {
    this.get("/:id", ["ADMIN", "USER"], (req, res) =>
      cartController.getById(req, res)
    );
    this.post("/:cartId/product/:productId", ["USER"], (req, res) =>
      cartController.addProductInCart(req, res)
    );
    this.put("/:cartId/:productId", ["USER"], (req, res) =>
      cartController.updateQuantityProductInCart(req, res)
    );
    this.delete("/:cartId/:productId", ["USER"], (req, res) =>
      cartController.deleteProductFromCart(req, res)
    );
    this.post("/:cartId/purchase", ["USER"], (req, res) =>
      cartController.purchaseCart(req, res)
    );
  }
}
