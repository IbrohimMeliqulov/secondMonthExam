import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { carRouter } from "./cars.routes.js";
import { orderRouter } from "./orders.routes.js";
import { paymentRouter } from "./payments.routes.js";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/cars", carRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/payments", paymentRouter);
