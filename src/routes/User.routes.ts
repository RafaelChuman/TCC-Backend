import { createUser, deleteUser, listUser, updateUser } from "@src/modules/User";
import { response, request, Router } from "express";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  createUser.execute(request, response);
});

userRoutes.get("/", (request, response) => {
  listUser.execute(request, response);
});

userRoutes.delete("/", (request, response) => {
  deleteUser.execute(request, response);
});

userRoutes.put("/", (request, response) => {
  updateUser.execute(request, response);
});

export { userRoutes };
