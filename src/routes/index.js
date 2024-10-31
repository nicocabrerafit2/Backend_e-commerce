import { Router } from "express";
import userRouter from "./userRoutes.js";
import productRouter from "./productsRoutes.js";
import cartsRouter from "./cartsRoutes.js";

const UserRouter = new userRouter();
const ProductRouter = new productRouter();
const CartsRouter = new cartsRouter();
const router = Router();

router.use("/api/sessions/", UserRouter.getRouter());
router.use("/api/products/", ProductRouter.getRouter());
router.use("/api/carts/", CartsRouter.getRouter());

export default router;
