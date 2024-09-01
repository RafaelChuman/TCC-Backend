import { DTOCreateIoT } from "@src/entity/Car/InterfaceIoT";
import { RepositoryIoT } from "@src/entity/Car/RepositoryIoT";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export class IoTCreate {
  async execute(request: Request, response: Response): Promise<Response> {
    const ioTRep = new RepositoryIoT();

    const data: DTOCreateIoT = {
      group: request.body.group,
      name: request.body.name,
    };

    
    const resp = await ioTRep.create(data);

    return response.status(200).json(resp);
  }
}
