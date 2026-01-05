import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

export const orderRouter = Router();

orderRouter
  .post("/", ordersController.POST)
  .get("/:id", ordersController.GET)
  .put("/:id", ordersController.UPDATE)
  .delete("/:id", ordersController.DELETE);
