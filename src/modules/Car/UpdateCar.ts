import { DTOCreateCar, DTOUpdateCar } from "@src/entity/Car/InterfaceCar";
import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export class UpdateCar {
  async execute(request: Request, response: Response): Promise<Response> {
    const carRep = new RepositoryCar();

    const data: DTOUpdateCar = {
      id: request.body.id,
      brand: request.body.brand,
      model: request.body.model,
      kind: request.body.kind,
      type: request.body.type,
      plate: request.body.plate,
      yearOfFabrication: request.body.yearOfFabrication,
      yearOfModel: request.body.yearOfModel,
      color: request.body.color,
      user: request.body.user,
    };
    
    const resp = await carRep.update(data);

    return response.status(200).json(resp);
  }
}
