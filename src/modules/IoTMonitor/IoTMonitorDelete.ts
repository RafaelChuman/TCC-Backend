import { DTODeleteIoTMonitor } from "@src/entity/OrderAndItem/InterfaceIoTMonitor";
import { RepositoryIoTMonitor } from "@src/entity/OrderAndItem/RepositoryIoTMonitor";
import { Request, Response } from "express";

export class IoTMonitorDelete {
    async execute(req: Request, resp: Response) {

        const data: DTODeleteIoTMonitor = req.body;

        const ioTMonitorRep = new RepositoryIoTMonitor();

        const response = ioTMonitorRep.delete(data);

        return resp.status(200).json(response);
    }
}