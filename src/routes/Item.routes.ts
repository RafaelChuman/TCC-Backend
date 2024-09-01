import { createItem, deleteItem, listItem, updateItem } from "@src/modules/Item";
import { response, request, Router } from "express";

const ItemRoutes = Router();

ItemRoutes.post("/", (request, response) => {
  createItem.execute(request, response);
});

ItemRoutes.get("/", (request, response) => {
  listItem.execute(request, response);
});

ItemRoutes.delete("/", (request, response) => {
  deleteItem.execute(request, response);
});

ItemRoutes.put("/", (request, response) => {
  updateItem.execute(request, response);
});



export { ItemRoutes };
