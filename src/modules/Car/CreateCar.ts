import { Request, Response } from "express";
import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { DTOCreateCar } from "@src/entity/Car/InterfaceCar";

export class CreateCar {
  async execute(request: Request, response: Response): Promise<Response> {
    const carRep = new RepositoryCar();

    const data: DTOCreateCar = {
      brand: request.body.brand,
      model: request.body.model,
      kind: request.body.kind,
      type: request.body.type,
      plate: request.body.plate,
      yearOfFabrication: request.body.yearOfFabrication,
      yearOfModel: request.body.yearOfModel,
      color: request.body.color,
      user: request.body.user
    }

    
    const resp = await carRep.create(data);

    return response.status(200).json(resp);
  }
}
