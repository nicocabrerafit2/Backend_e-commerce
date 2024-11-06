import UserController from "../controllers/userController.js";
import BasicRouter from "./basicRouter.js";

const userController = new UserController();

export default class UserRouter extends BasicRouter {
  init() {
    this.get("/", ["ADMIN"], userController.getAll);
    this.post("/login", ["PUBLIC"], userController.login);
    this.post("/register", ["PUBLIC"], userController.register);
    this.get("/mail", ["ADMIN"], userController.sendMail);
    this.get("/:id", ["ADMIN"], (req, res) => userController.getById(req, res));
    this.delete("/:id", ["ADMIN"], (req, res) =>
      userController.delete(req, res)
    );

    // Catch-all routes for errors
    this.handleInvalidRoutes();
  }

  handleInvalidRoutes() {
    this.get("*", this.invalidRouteHandler);
    this.post("*", this.invalidRouteHandler);
  }

  invalidRouteHandler(req, res) {
    res.status(404).send("Error: Ruta no encontrada");
  }
}
