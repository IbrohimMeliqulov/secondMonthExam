import { Router } from "express";
import carsController from "../controllers/cars.controller.js";

export const carRouter = Router();

carRouter
  .post("/", carsController.POST)
  .get("/", carsController.GET)
  .get("/:id", carsController.getOne)
  .put("/:id", carsController.UPDATE)
  .delete("/:id", carsController.DELETE);
