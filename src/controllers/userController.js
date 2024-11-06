import UserService from "../services/userServices.js";
import CartService from "../services/cartServices.js";
import { createResponse } from "../utils/utils.js";
import basicController from "./basicController.js";
import path from "path";
import { __dirname } from "../utils/utils.js";
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

      createResponse(res, 200, {
        message: "Registro exitoso",
        data,
      });

      // Envío del correo tras el registro exitoso
      try {
        const subject = "Registro Exitoso";
        const message = `
        <div>
          <p>Se ha registrado con éxito</p>
          <a href="https://google.com.ar" target="_blank">
            <img src="cid:img01" alt="Imagen" />
          </a>
        </div>
      `;
        const attachments = [
          {
            filename: "Hay_tabla.png",
            path: path.join(__dirname, "..", "img", "Hay_tabla.png"),
            cid: "img01",
          },
        ];

        const mailSend = await this.service.sendMail(
          req.body.email,
          subject,
          message,
          attachments
        );
        if (!mailSend) {
          console.error("Error al enviar el mail");
        } else {
          console.log("Mail enviado con éxito");
        }
      } catch (mailError) {
        console.error("Error en el envío del mail:", mailError);
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
