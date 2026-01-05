import { Router } from "express";
import usersController from "../controllers/users.controller.js";

export const userRouter = Router();

userRouter
  .post("/", usersController.POST)
  .get("/", usersController.GET)
  .get("users/:id", usersController.getOne)
  .delete("users/:id", usersController.DELETE)
  .put("/users/:id", usersController.UPDATE);
