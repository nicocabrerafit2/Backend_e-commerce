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
  async sendMail(user) {
    //Por el momento hardcodeado (no uso el user que viene por parametro)
    try {
      const mailSend = await transport.sendMail({
        from: "NC developer <nicocabrera8@gmail.com>",
        to: "nicocabrera8@outlook.com",
        subject: "Prueba de envío de mail automático",
        html: `
            <div>
                <p> Saludos desde nodemailer(librería para enviar mails)</p>
                <a href="https://goole.com.ar" target="__blank"> 
                    <img src="cid:img01" />
                </a>
            </div>
        `,
        attachments: [
          {
            filename: "Hay_tabla.png",
            path: path.join(__dirname, "..", "/img/Hay_tabla.png"),
            cid: "img01",
          },
        ],
      });
      return mailSend;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserService;
