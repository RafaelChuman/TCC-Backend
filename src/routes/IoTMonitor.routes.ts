import { Router, request, response } from "express";
import { ensureAuthenticated } from "@src/midlewares/ensureAuthenticated";
import { ioTMonitorCreate, ioTMonitorDelete, ioTMonitorList } from "@src/modules/IoTMonitor";

const iotMonitorRoutes = Router();

iotMonitorRoutes.get("/", ensureAuthenticated, (request, response) => ioTMonitorList.execute(request, response));

iotMonitorRoutes.post("/", (request, response) => ioTMonitorCreate.execute(request, response));

iotMonitorRoutes.delete("/", ensureAuthenticated, (request, response) => ioTMonitorDelete.execute(request, response));

export { iotMonitorRoutes };

