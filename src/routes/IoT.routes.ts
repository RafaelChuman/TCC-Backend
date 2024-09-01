import { ioTCreate, ioTDelete, ioTList, ioTUpdate } from "@src/modules/Car";
import { Router } from "express";

const ioTRoutes = Router();

ioTRoutes.post("/", (request, response) =>
  ioTCreate.execute(request, response)
);

ioTRoutes.put("/", (request, response) => ioTUpdate.execute(request, response));

ioTRoutes.delete("/", (request, response) =>
  ioTDelete.execute(request, response)
);

ioTRoutes.get("/", (request, response) => ioTList.execute(request, response));

export { ioTRoutes };
