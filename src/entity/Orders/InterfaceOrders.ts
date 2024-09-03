import { DeleteResult, InsertResult } from "typeorm";
import { Orders } from "./Orders";
import { User } from "../User/User";
import { Car } from "../Car/Car";

interface DTOCreateOrders {
  km: number;
  fuel: number;
  statusExecution: string;
  statusOrder: Boolean;
  car: Car
  user: User

}

interface DTODeleteOrders {
  id: string[];
}

interface DTOUpdateOrders {
  id: string;
  km: number;
  fuel: number;
  statusExecution: string;
  statusOrder: Boolean;
  car: Car
  user: User
}

interface InterfaceOrders {
  create(data: DTOCreateOrders): Promise<InsertResult>;
  delete(data: DTODeleteOrders): Promise<DeleteResult>;
  update(data: DTOUpdateOrders): Promise<InsertResult | null>;
  listByUser(userId: string): Promise<Orders[] | null>;
  findByCar(plate: string): Promise<Orders[] | null>;
}

export { InterfaceOrders, DTOCreateOrders, DTODeleteOrders, DTOUpdateOrders };
