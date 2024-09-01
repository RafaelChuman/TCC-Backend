import { DeleteResult, InsertResult } from "typeorm";
import { Order } from "./Order";
import { User } from "../User/User";
import { Car } from "../Car/Car";

interface DTOCreateOrder {
  km: number;
  fuel: number;
  statusExecution: string;
  statusOrder: Boolean;
  car: Car
  user: User

}

interface DTODeleteOrder {
  ids: string[];
}

interface DTOUpdateOrder {
  id: string;
  km: number;
  fuel: number;
  statusExecution: string;
  statusOrder: Boolean;
  car: Car
  user: User
}

interface InterfaceOrder {
  create(data: DTOCreateOrder): Promise<InsertResult>;
  delete(data: DTODeleteOrder): Promise<DeleteResult>;
  update(data: DTOUpdateOrder): Promise<InsertResult | null>;
  listByUser(userId: string): Promise<Order[]>;
  findByCar(groupName: string): Promise<Order | null>;
}

export { InterfaceOrder, DTOCreateOrder, DTODeleteOrder, DTOUpdateOrder };
