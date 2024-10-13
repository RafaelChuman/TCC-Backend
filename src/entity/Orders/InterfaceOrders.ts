import { DeleteResult, InsertResult } from "typeorm";
import { Orders } from "./Orders";
import { User } from "../User/User";
import { Car } from "../Car/Car";

interface DTOCreateOrders {
  orderId: string
  km: number
  fuel: number
  statusExecution: string
  statusOrder: Boolean
  createdAt: Date
  deleted: Boolean
  updated: Date

  carId: string
  userId: string
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
  save(newOrder: Orders[]): Promise<Orders[] | null>;
  delete(data: DTODeleteOrders): Promise<DeleteResult>;
  listByUser(userId: string): Promise<Orders[] | null>;
  findByCar(plate: string): Promise<Orders[] | null>;
  findById(id: string[]): Promise<Orders[] | null>;
}

export { InterfaceOrders, DTOCreateOrders, DTODeleteOrders, DTOUpdateOrders };
