import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { persistenceDaoInit } from "../persistence/factory.js";
import { configPassport } from "../middlewares/jwtPassport.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import routerIndex from "../routes/index.js";

export const AppInit = (app) => {
  dotenv.config();
  persistenceDaoInit();
  configPassport();
  passport.initialize();
  app.use(cookieParser(process.env.SECRET));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/", routerIndex);
};
