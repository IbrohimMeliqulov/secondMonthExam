import { Router } from "express";
import paymentsController from "../controllers/payments.controller.js";

export const paymentRouter = Router();

paymentRouter
  .post("/", paymentsController.POST)
  .get("/:id", paymentsController.GET)
  .put("/:id", paymentsController.UPDATE)
  .delete("/:id", paymentsController.DELETE);
