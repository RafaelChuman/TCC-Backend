import { Router, request, response } from "express";
import { ensureAuthenticated } from "@src/midlewares/ensureAuthenticated";
import { createOrderAndItems, deleteOrderAndItems, listOrderAndItems } from "@src/modules/OrderAndItems";

const OrderAndItemsRoutes = Router();

OrderAndItemsRoutes.get("/", ensureAuthenticated, (request, response) => listOrderAndItems.execute(request, response));

OrderAndItemsRoutes.post("/", (request, response) => createOrderAndItems.execute(request, response));

OrderAndItemsRoutes.delete("/", ensureAuthenticated, (request, response) => deleteOrderAndItems.execute(request, response));

export { OrderAndItemsRoutes };

