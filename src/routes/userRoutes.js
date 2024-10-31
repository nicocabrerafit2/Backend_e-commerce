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
    this.get("*", (req, res) => {
      res.send("Error no se encontro la ruta");
    });
    this.post("*", (req, res) => {
      res.send("Error no se encontro la ruta");
    });
  }
}
