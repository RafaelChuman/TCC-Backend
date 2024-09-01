import { DTOListIoTMonitorByUser } from "@src/entity/OrderAndItem/InterfaceIoTMonitor";
import { RepositoryIoTMonitor } from "@src/entity/OrderAndItem/RepositoryIoTMonitor";
import { Request, Response } from "express";

export class IoTMonitorList {
  async execute(request: Request, response: Response): Promise<Response> {
    const userId = request.headers.userId;
    const dateBegin = request.query.dateBegin;
    const dateEnd = request.query.dateEnd;

    if (userId && dateBegin && dateEnd) {
      if (
        typeof userId == "string" &&
        typeof dateBegin == "string" &&
        typeof dateEnd == "string"
      ) {
        const data: DTOListIoTMonitorByUser = {
          userId: userId,
          dateBegin: new Date(dateBegin),
          dateEnd: new Date(dateEnd),
        };

        const ioTMonitorRep = new RepositoryIoTMonitor();

        const resp = await ioTMonitorRep.listByUser(data);

        return response.status(200).json(resp);
      }
    }
    return response.status(422).json("Unprocessable Entity");
  }
}
