import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { Request, Response } from "express";

export class ListCar {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const carRep = new RepositoryCar();
      const userId = request.body.userId;
      const plate = request.body.plate;
      const id = request.body.id;

      if (id) {
        if (typeof id === "string") {
          const resp = await carRep.listCarById(id);
          return response.status(200).json(resp);
        }
        return response.status(422).json("Unprocessable Entity");
      }

      if (userId) {
        if (typeof userId === "string") {
          const resp = await carRep.listCarByUser(userId);
          return response.status(200).json(resp);
        }
        return response.status(422).json("Unprocessable Entity");
      }

      if (plate) {
        if (typeof plate === "string") {
          const resp = await carRep.listCarByPlate(plate);
          return response.status(200).json(resp);
        }
        return response.status(422).json("Unprocessable Entity");
      }

      const resp = await carRep.listAll();
      return response.status(200).json(resp);

    } catch (e) {
      console.log(`ListCar - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}
