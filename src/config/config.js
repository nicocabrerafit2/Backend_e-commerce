import express from "express";
import dotenv from "dotenv";
import { persistenceDaoInit } from "../persistence/factory.js";
import { configPassport } from "../middlewares/jwtPassport.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import router from "../routes/index.js";

export const AppInit = (app) => {
  dotenv.config();
  persistenceDaoInit();
  configPassport();
  passport.initialize();
  app.use(cookieParser(process.env.SECRET));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", router);
};
