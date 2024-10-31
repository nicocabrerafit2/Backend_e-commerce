import express from "express";
import { AppInit } from "./config/config.js";

const app = express();
AppInit(app);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server on http://localhost:" + PORT);
});
