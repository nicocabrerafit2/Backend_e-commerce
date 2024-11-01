import { Router } from "express";
import userRouter from "./userRoutes.js";
import productRouter from "./productsRoutes.js";
import cartsRouter from "./cartsRoutes.js";

const router = Router();

router.use("/api/sessions/", new userRouter().getRouter());
router.use("/api/products/", new productRouter().getRouter());
router.use("/api/carts/", new cartsRouter().getRouter());

export default router;
