import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, pass) => {
  return bcrypt.compareSync(pass, user.password);
};

export const getJWTCookie = (req) => {
  let token = null;
  if (req.signedCookies) {
    token = req.signedCookies["currentUser"];
  }
  return token;
};

export const generadorToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: "24h" });
  return token;
};

export const createResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({ data });
};
export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "nicocabrera8@gmail.com",
    pass: "tsdg igis tmrj utqp",
  },
});
