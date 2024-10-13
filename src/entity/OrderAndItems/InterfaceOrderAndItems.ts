import { DeleteResult, InsertResult } from "typeorm";
import { Orders } from "../Orders/Orders";
import { OrderAndItems } from "./OrderAndItems";
import { Item } from "../Item/Item";

interface DTOCreateOrderAndItems {
  id: string,      
  type: string,
  name: string,
  unitMeasurement:  string,
  quantity: number,
  price: number,
  discount: number,
  createdAt: Date,
  updated: Date,
  deleted: boolean,
  orderId: string,
}

interface DTOListOrderAndItemsByOrder {
  orderId: Orders;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTOListOrderAndItemsByUser {
  userId: string;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTODeleteOrderAndItems {
  id: string[];
}

interface InterfaceOrderAndItems {
  save(data: OrderAndItems[]): Promise<OrderAndItems[] | null>;
  listByOrder(data: DTOListOrderAndItemsByOrder): Promise<OrderAndItems[] | null>;
  listByUser(data: DTOListOrderAndItemsByUser): Promise<OrderAndItems[] | null>;
  purgeById(id:  String[]): Promise<DeleteResult>;
  purgeByOrderid(orderId:  String[]): Promise<DeleteResult>;
}

export {
  InterfaceOrderAndItems,
  DTOCreateOrderAndItems,
  DTOListOrderAndItemsByOrder,
  DTOListOrderAndItemsByUser,
  DTODeleteOrderAndItems,
};
