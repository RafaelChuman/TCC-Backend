import { DeleteResult, InsertResult } from "typeorm";
import { Orders } from "../Orders/Orders";
import { OrderAndItems } from "./OrderAndItems";
import { Item } from "../Item/Item";

interface DTOCreateOrderAndItems {
  quantity: number
  price: number
  discount: number
  item: Item,
  orders: Orders,
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
  create(data: DTOCreateOrderAndItems): Promise<InsertResult | null>;
  listByOrder(data: DTOListOrderAndItemsByOrder): Promise<OrderAndItems[] | null>;
  listByUser(data: DTOListOrderAndItemsByUser): Promise<OrderAndItems[] | null>;
  delete(data: DTODeleteOrderAndItems): Promise<DeleteResult>;
}

export {
  InterfaceOrderAndItems,
  DTOCreateOrderAndItems,
  DTOListOrderAndItemsByOrder,
  DTOListOrderAndItemsByUser,
  DTODeleteOrderAndItems,
};
