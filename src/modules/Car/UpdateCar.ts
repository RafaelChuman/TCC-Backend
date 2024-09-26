import { Car } from "@src/entity/Car/Car";
import { DTOCreateCar, DTOUpdateCar } from "@src/entity/Car/InterfaceCar";
import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { AppError } from "@src/errors/AppError";
import { Request, Response } from "express";
import { InsertResult } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class UpdateCar {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const carRep = new RepositoryCar();
      const userRep = new RepositoryUser();
      
      const car = new Car();
      var resp : Car | null = null

      console.log("\n\nCreateCar request.body " + JSON.stringify(request.body) + "\n\n");

      var bodyItem: DTOCreateCar;
      for (bodyItem of request.body) {

        const user = await userRep.findById(bodyItem.userId);

        if(user == null) throw new AppError("Parâmetro userId incorreto", 503);

        car.id = bodyItem.id;
        car.brand = bodyItem.brand;
        car.model = bodyItem.model;
        car.kind = bodyItem.kind;
        car.type = bodyItem.type;
        car.plate = bodyItem.plate;
        car.yearOfFabrication = bodyItem.yearOfFabrication;
        car.yearOfModel = bodyItem.yearOfModel;
        car.color = bodyItem.color;
        car.user = user;
        car.createdAt = bodyItem.createdAt;
        car.deleted = bodyItem.deleted;
        car.updated = bodyItem.updated;

        resp = await carRep.update(car);
      }

      return response.status(200).json(resp);
    } catch (e) {
      console.log(`UpdateCar - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}
