import { createCar, deleteCar, listCar, updateCar } from "@src/modules/Car";
import { Router } from "express";

const CarRoutes = Router();

CarRoutes.post("/", (request, response) =>
  createCar.execute(request, response)
);

CarRoutes.put("/", (request, response) => updateCar.execute(request, response));

CarRoutes.delete("/", (request, response) =>
  deleteCar.execute(request, response)
);

CarRoutes.get("/", (request, response) => listCar.execute(request, response));

export { CarRoutes };
