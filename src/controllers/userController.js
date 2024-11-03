import UserService from "../services/userServices.js";
import CartService from "../services/cartServices.js";
import { createResponse } from "../utils/utils.js";
import basicController from "./basicController.js";
const userService = new UserService();
const cartService = new CartService();
class UserController extends basicController {
  constructor() {
    super(userService);
    this.cartService = cartService;
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body, this.cartService);
      if (!data) {
        return createResponse(res, 404, {
          message: "Este email ya se encuentra registrado",
        });
      }

      createResponse(res, 200, data);

      try {
        const mailSend = await this.service.sendMail(req.body);
        if (!mailSend) {
          console.error("Error al enviar el mail");
        } else {
          console.log("Mail enviado con éxito");
        }
      } catch (error) {
        console.error("Error en el envío del mail:", error);
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      if (!token) {
        return createResponse(res, 404, {
          message: "Email o contraseña incorrectos",
        });
      }

      res
        .status(200)
        .cookie("currentUser", token, {
          maxAge: 600000,
          signed: true,
          httpOnly: true,
        })
        .json({ message: "login OK", token });
    } catch (error) {
      next(error);
    }
  };

  sendMail = async (req, res, next) => {
    try {
      const mailSend = await this.service.sendMail(req.body);
      if (!mailSend) {
        createResponse(res, 404, {
          message: "Error al enviar el mail",
        });
      } else {
        createResponse(res, 200, {
          message: "Mail enviado con éxito",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
