import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { Request, Response } from "express";

export class ListCar {
  async execute(request: Request, response: Response): Promise<Response> {
    const carRep = new RepositoryCar();
    const userId = request.body.userId;

    if (userId) {
      if (typeof userId === "string") {

        const resp = await carRep.listCarByUser(userId);
        return response.status(200).json(resp);
        
      }
    }
    return response.status(422).json("Unprocessable Entity");
  }
}
