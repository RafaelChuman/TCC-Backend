import { Request, Response } from "express";
import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { DTODeleteCar } from "@src/entity/Car/InterfaceCar";

export class DeleteCar {
  async execute(request: Request, response: Response): Promise<Response> {
    const carRep = new RepositoryCar();

    const data: DTODeleteCar = {
      id: request.body.id,
    };

    if (data.id) {
      if (typeof data.id === "string") {
        const resp = await carRep.delete(data);

        return response.status(200).json(resp);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}
