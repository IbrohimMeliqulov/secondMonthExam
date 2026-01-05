import { Router } from "express";
import usersController from "../controllers/users.controller.js";

export const userRouter = Router();

userRouter
  .get("/", usersController.GET)
  .post("/", usersController.POST)
  .get("/:id", usersController.getOne)
  .delete("/:id", usersController.DELETE)
  .put("/:id", usersController.UPDATE);
