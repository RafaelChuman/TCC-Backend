import { Request, Response } from "express";
import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { DTODeleteCar } from "@src/entity/Car/InterfaceCar";
import { AppError } from "@src/errors/AppError";

export class DeleteCar {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const carRep = new RepositoryCar();

      const data: DTODeleteCar = {
        carId: request.body.carId,
      };

      if (data.carId == null || data.carId.length == 0)
        throw new AppError("Parâmetro userId incorreto", 503);

      const resp = await carRep.delete(data);

      return response.status(200).json(resp);
    } catch (e) {
      console.log(`DeleteCar - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}
