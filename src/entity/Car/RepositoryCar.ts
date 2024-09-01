
import { PostgresDS } from "@src/data-source";
import { DTOCreateCar, DTODeleteCar, DTOUpdateCar, InterfaceCar } from "./InterfaceCar";
import { Car } from "./Car";
import { DeleteResult, In, InsertResult } from "typeorm";

class RepositoryCar implements InterfaceCar {
  async create(data: DTOCreateCar): Promise<InsertResult | null> {
    const newCar = new Car();

    if (data == null) return null;

    newCar.brand = data.brand
    newCar.model = data.model
    newCar.kind = data.kind
    newCar.type = data.type
    newCar.plate = data.plate
    newCar.yearOfFabrication = data.yearOfFabrication
    newCar.yearOfModel = data.yearOfModel
    newCar.color = data.color
    newCar.user = data.user

    newCar.deleted = false
    newCar.updated = new Date(Date.now())

    return await PostgresDS.manager.insert(Car, newCar);
  }

  async update(data: DTOUpdateCar): Promise<InsertResult | null> {

    const updtCar = await PostgresDS.manager.findOneBy(Car, {
      id: data.id,
    });

    if (!updtCar) return null;

    updtCar.brand = data.brand
    updtCar.model = data.model
    updtCar.kind = data.kind
    updtCar.type = data.type
    updtCar.plate = data.plate
    updtCar.yearOfFabrication = data.yearOfFabrication
    updtCar.yearOfModel = data.yearOfModel
    updtCar.color = data.color
    updtCar.user = data.user

    updtCar.deleted = false
    updtCar.updated = new Date(Date.now())

    return await PostgresDS.manager.insert(Car, updtCar);
  }

  async listCarByUser(userId: string): Promise<Car[] | null> {
    const carRep = PostgresDS.getRepository(Car);

    return await carRep.find({
      relations: {
        user: true
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async delete(data: DTODeleteCar): Promise<DeleteResult> {
    const carRep = PostgresDS.getRepository(Car);

    return await carRep.delete({ id : In(data.id)} );
  }
}

export { RepositoryCar };

//import { DeleteResult, In } from "typeorm";