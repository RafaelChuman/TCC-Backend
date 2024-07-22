import { ensureAuthenticated } from "@src/midlewares/ensureAuthenticated";
import { ensureIsAdmin } from "@src/midlewares/ensureIsAdmin";
import { createGroup, deleteGroup, listGroup, updateGroup } from "@src/modules/Group";
import { response, request, Router } from "express";

const groupRoutes = Router();

groupRoutes.post("/", (request, response) => {
  createGroup.execute(request, response);
});

groupRoutes.get("/", (request, response) => {
  listGroup.execute(request, response);
});

groupRoutes.delete("/", (request, response) => {
  deleteGroup.execute(request, response);
});

groupRoutes.put("/", (request, response) => {
  updateGroup.execute(request, response);
});



export { groupRoutes };
