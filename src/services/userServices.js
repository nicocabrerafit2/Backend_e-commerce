import { createHash, generadorToken, isValidPassword } from "../utils/utils.js";
import { UserRepository } from "../repositories/index.js";

import basicServices from "./basicServices.js";
import { transport } from "../utils/utils.js";
import { __dirname } from "../utils/utils.js";
import path from "path";
import { userDTOReq, userDTORes } from "../persistence/DTO/userDTO.js";

class UserService extends basicServices {
  constructor() {
    super(UserRepository);
  }

  async register(user, cartService) {
    try {
      const userData = new userDTOReq(user);
      const { email, password } = userData;
      const existUser = await super.getByEmail(email);
      if (!existUser) {
        const newUser = await super.create({
          ...user,
          password: createHash(password),
        });
        const newCart = await cartService.create(newUser.id);
        newUser.carts.push(newCart.id);
        await newUser.save();
        return newUser;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const userData = new userDTOReq(user);
      const { email, password } = userData;
      const userExist = await super.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(userExist, password);
      if (!passValid) return null;
      if (userExist && passValid) {
        const data = new userDTORes(userExist);
        return generadorToken({ data });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async sendMail(to, subject, message, attachments) {
    try {
      const mailOptions = {
        from: "NC developer <nicocabrera8@gmail.com>",
        to,
        subject,
        html: message,
        attachments,
      };

      const mailSend = await transport.sendMail(mailOptions);
      return mailSend;
    } catch (error) {
      console.error("Error al enviar el mail:", error);
      throw new Error("Error en el envío de correo");
    }
  }
}

export default UserService;
