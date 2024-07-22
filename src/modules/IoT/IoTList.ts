import { RepositoryIoT } from "@src/entity/IoT/RepositoryIoT";
import { Request, Response } from "express";

export class IoTList {
  async execute(request: Request, response: Response): Promise<Response> {
    const userId = request.headers.userId;

    if (userId) {
      if (typeof userId === "string") {
        const ioTRep = new RepositoryIoT();

        const ers = await ioTRep.listIoTByUser(userId);

        return response.status(200).json(ers);
      }
    }
    return response.status(422).json("Unprocessable Entity");
  }
}
