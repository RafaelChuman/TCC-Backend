import { PostgresDS } from "@src/data-source";
import {
  DTOCreateCar,
  DTODeleteCar,
  DTOUpdateCar,
  InterfaceCar,
} from "./InterfaceCar";
import { Car } from "./Car";
import { DeleteResult, In, InsertResult } from "typeorm";

class RepositoryCar implements InterfaceCar {
  async create(newCar: Car): Promise<InsertResult | null> {
    try {
      if (newCar == null) return null;

      console.log(`create " + ${JSON.stringify(newCar)}`);

      return await PostgresDS.manager.insert(Car, newCar);
    } catch (e) {
      console.log(`RepositoryCar - create Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async update(data: Car): Promise<Car | null> {
    try {
      const updtCar = await PostgresDS.manager.findOneBy(Car, {
        carId: data.carId,
      });

      if (!updtCar) return null;

      updtCar.brand = data.brand;
      updtCar.model = data.model;
      updtCar.kind = data.kind;
      updtCar.type = data.type;
      updtCar.plate = data.plate;
      updtCar.yearOfFabrication = data.yearOfFabrication;
      updtCar.yearOfModel = data.yearOfModel;
      updtCar.color = data.color;
      updtCar.user = data.user;

      updtCar.deleted = false;
      updtCar.updated = data.updated;

      return await PostgresDS.manager.save(Car, updtCar);
    } catch (e) {
      console.log(`RepositoryCar - update Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async listAll(): Promise<Car[] | null> {
    try {
      const carRep = PostgresDS.getRepository(Car);

      const query = PostgresDS.manager
      .createQueryBuilder(Car, "Car")
      .select(`"carId", brand, model, kind, type, plate, "yearOfFabrication", "yearOfModel", color, "createdAt", deleted, updated, "userId"`)

      return await query.execute();
      // return await carRep
      // .createQueryBuilder("Car")
      // .select(["id", "brand", "model", "kind", "type", "plate", "color",  "deleted", "updated"])
      // .getMany()

      // return await carRep.find({
      //   relations: {
      //     user: true,
      //   },
      // });
    } catch (e) {
      console.log(`RepositoryCar - listAll Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

    async findByIdVector(carId: string[]): Promise<Car[] | null> {
      try {
        const carRep = PostgresDS.getRepository(Car);

        return await carRep.find({
          relations: {
            user: true,
          },
          where: {
            carId: In(carId)
          },
        });

      } catch (e) {
        console.log(`RepositoryCar - findById Error: ${JSON.stringify(e)}`);
      }
      return null;
    }

    async findById(carId: string): Promise<Car | null> {
      try {
        const carRep = PostgresDS.getRepository(Car);

        return await carRep.findOne({
          relations: {
            user: true,
          },
          where: {
            carId: carId
          },
        });

      } catch (e) {
        console.log(`RepositoryCar - findById Error: ${JSON.stringify(e)}`);
      }
      return null;
    }


  async listCarByUser(userId: string): Promise<Car[] | null> {
    try {
      const carRep = PostgresDS.getRepository(Car);

      return await carRep.find({
        relations: {
          user: true,
        },
        where: {
          user: {
            userId: userId,
          },
        },
      });
    } catch (e) {
      console.log(`RepositoryCar - listCarByUser Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async listCarById(carId: string): Promise<Car | null> {
    try {
      const carRep = PostgresDS.getRepository(Car);

      return await carRep.findOne({
        relations: {
          user: true,
        },
        where: {
          carId: carId,
        },
      });
    } catch (e) {
      console.log(`RepositoryCar - listCarById Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async listCarByPlate(plate: string): Promise<Car[] | null> {
    try {
      const carRep = PostgresDS.getRepository(Car);

      return await carRep.find({
        relations: {
          user: true,
        },
        where: {
          plate: plate,
        },
      });
    } catch (e) {
      console.log(`RepositoryCar - listCarByPlate Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async delete(data: DTODeleteCar): Promise<DeleteResult | null> {
    try {
      const carRep = PostgresDS.getRepository(Car);

      return await carRep.delete({ carId: In(data.carId) });
    } catch (e) {
      console.log(`RepositoryCar - delete Error: ${JSON.stringify(e)}`);
    }
    return null;
  }
}

export { RepositoryCar };

//import { DeleteResult, In } from "typeorm";
