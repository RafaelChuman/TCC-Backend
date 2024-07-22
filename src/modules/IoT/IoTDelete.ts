import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { idText } from "typescript";
import { RepositoryIoT } from "@src/entity/IoT/RepositoryIoT";
import { DTODeleteIoT } from "@src/entity/IoT/InterfaceIoT";

export class IoTDelete {
  async execute(request: Request, response: Response): Promise<Response> {
    const ioTRep = new RepositoryIoT();

    const data: DTODeleteIoT = {
      ioT: request.body.ioT,
    };

    if (data.ioT) {
      if (typeof data.ioT === "string") {
        const resp = await ioTRep.delete(data);

        return response.status(200).json(resp);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}
