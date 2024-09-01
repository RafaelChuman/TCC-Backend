import { createUser, deleteUser, listUser, updateUser } from "@src/modules/User";
import { response, request, Router } from "express";

const UserRoutes = Router();

UserRoutes.post("/", (request, response) => {
  createUser.execute(request, response);
});

UserRoutes.get("/", (request, response) => {
  listUser.execute(request, response);
});

UserRoutes.delete("/", (request, response) => {
  deleteUser.execute(request, response);
});

UserRoutes.put("/", (request, response) => {
  updateUser.execute(request, response);
});

export { UserRoutes };
