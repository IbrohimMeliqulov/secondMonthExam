import { Router } from "express";
import carsController from "../controllers/cars.controller.js";

export const carRouter = Router();

carRouter
  .get("/", carsController.GET)
  .post("/", carsController.POST)
  .get("/:id", carsController.getOne)
  .put("/:id", carsController.UPDATE)
  .delete("/:id", carsController.DELETE);
