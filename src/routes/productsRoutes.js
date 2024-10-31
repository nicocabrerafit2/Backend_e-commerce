import ProductController from "../controllers/productController.js";
import BasicRouter from "./basicRouter.js";

const productController = new ProductController();

export default class ProductRouter extends BasicRouter {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => productController.getAll(req, res));
    this.get("/:id", ["PUBLIC"], (req, res) =>
      productController.getById(req, res)
    );
    this.post("/", ["ADMIN"], (req, res) => productController.create(req, res));
    this.put("/:id", ["ADMIN"], (req, res) =>
      productController.update(req, res)
    );
    this.delete("/:id", ["ADMIN"], (req, res) =>
      productController.delete(req, res)
    );

    this.get("*", (req, res) => {
      res.send("Error no se encontro la ruta");
    });
    this.post("*", (req, res) => {
      res.send("Error no se encontro la ruta");
    });
  }
}
