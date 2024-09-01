import { DTOCreateIoT, DTOUpdateIoT } from "@src/entity/Car/InterfaceIoT";
import { RepositoryIoT } from "@src/entity/Car/RepositoryIoT";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export class IoTUpdate {
  async execute(request: Request, response: Response): Promise<Response> {
    const ioTRep = new RepositoryIoT();

    const data: DTOUpdateIoT = {
      id: request.body.id,
      group: request.body.group,
      name: request.body.name,
    };
    
    const resp = await ioTRep.update(data);

    return response.status(200).json(resp);
  }
}
