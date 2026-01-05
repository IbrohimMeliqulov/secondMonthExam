import { Router } from "express";
import { userRouter } from "./users.routes.js";
import { carRouter } from "./cars.routes.js";
import { orderRouter } from "./orders.routes.js";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/cars", carRouter);
mainRouter.use("/orders", orderRouter);
