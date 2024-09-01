import { DeleteResult, InsertResult } from "typeorm";
import { Order } from "../Order/Order";
import { OrderAndItem } from "./OrderAndItem";
import { Item } from "../Item/Item";

interface DTOCreateOrderAndItem {
  quantity: number
  price: number
  discount: number
  item: Item,
  order: Order,
}

interface DTOListOrderAndItemByOrder {
  order: Order;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTOListOrderAndItemByUser {
  userId: string;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface DTODeleteOrderAndItem {
  id: string[];
}

interface InterfaceOrderAndItem {
  create(data: DTOCreateOrderAndItem): Promise<InsertResult | null>;
  listByIoT(data: DTOListOrderAndItemByOrder): Promise<OrderAndItem[] | null>;
  listByUser(data: DTOListOrderAndItemByUser): Promise<OrderAndItem[] | null>;
  delete(data: DTODeleteOrderAndItem): Promise<DeleteResult>;
}

export {
  InterfaceOrderAndItem,
  DTOCreateOrderAndItem,
  DTOListOrderAndItemByOrder,
  DTOListOrderAndItemByUser,
  DTODeleteOrderAndItem,
};
