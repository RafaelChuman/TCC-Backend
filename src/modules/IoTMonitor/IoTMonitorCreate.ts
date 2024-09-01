import { DTOCreateIoTMonitor } from "@src/entity/OrderAndItem/InterfaceIoTMonitor";
import { RepositoryIoTMonitor } from "@src/entity/OrderAndItem/RepositoryIoTMonitor";
import { Request, Response } from "express";

export class IoTMonitorCreate {
    async execute(request: Request, response: Response): Promise<Response> {

        const data: DTOCreateIoTMonitor = request.body;

        const ioTMonitorRep = new RepositoryIoTMonitor()

        const resp = await ioTMonitorRep.create(data);

        return response.status(201).json(resp);
    }
}