import { Router } from "express";
import { uploadFile } from "@config/fileManager";
import { createOrders, deleteOrders, listOrders, updateOrders } from "@src/modules/Orders";

const OrdersRoutes = Router();

//const uploadPhoto = multer(uploadFile("./tmp/Zones"));

OrdersRoutes.post("/", (request, response) =>
  createOrders.execute(request, response)
);

OrdersRoutes.get("/", (request, response) =>
  listOrders.execute(request, response)
);

OrdersRoutes.delete("/", (request, response) =>
  deleteOrders.execute(request, response)
);

OrdersRoutes.put("/", (request, response) =>
  updateOrders.execute(request, response)
);

// zonesRoutes.patch("/", uploadPhoto.single("Zones"), ensureAuthenticated,
//   (request, response) =>
//   uploadZonesController().handle(request, response));

export { OrdersRoutes };
