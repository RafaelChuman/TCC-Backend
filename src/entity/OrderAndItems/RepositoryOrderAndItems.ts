import { Between, DeleteResult, In, InsertResult } from "typeorm";
import { PostgresDS } from "@src/data-source";
import { DTOCreateOrderAndItems, DTODeleteOrderAndItems, DTOListOrderAndItemsByOrder, DTOListOrderAndItemsByUser, InterfaceOrderAndItems } from "./InterfaceOrderAndItems";
import { OrderAndItems } from "./OrderAndItems";

class RepositoryOrderAndItems implements InterfaceOrderAndItems {
  async create(data: DTOCreateOrderAndItems): Promise<InsertResult | null> {
    const orderAndItemsRepository = PostgresDS.manager.getRepository(OrderAndItems)

    const newOrderAndItems = new OrderAndItems();

    newOrderAndItems.quantity = data.quantity
    newOrderAndItems.price = data.price
    newOrderAndItems.discount = data.discount
    newOrderAndItems.orders = data.orders
    newOrderAndItems.item = data.item
    newOrderAndItems.deleted = false

    const resp = await orderAndItemsRepository.insert(newOrderAndItems);

    return resp;
  }

  async listByOrder(data: DTOListOrderAndItemsByOrder): Promise<OrderAndItems[] | null> {
    const orderAndItemsRepository = PostgresDS.manager.getRepository(OrderAndItems)

    let whereConstrant = {};

    if (data.orders)
      whereConstrant = {
        ...whereConstrant,
        order: data.orders,
      };

    if (data.dateBegin && data.dateEnd) {
      whereConstrant = {
        ...whereConstrant,
        createdAt: Between(data.dateBegin, data.dateEnd),
      };
    }

    return await orderAndItemsRepository.find({
      relations: {
        orders: true
      },
      where: whereConstrant,
    });
  }

  async listByUser(
    data: DTOListOrderAndItemsByUser
  ): Promise<OrderAndItems[] | null> {
    
    const orderAndItemsRepository = PostgresDS.manager.getRepository(OrderAndItems)
    let whereConstrant = {};

    if (data.userId)
      whereConstrant = {
        ...whereConstrant,
        order: {
          user: { id: data.userId },
        },
      };

    if (data.dateBegin && data.dateEnd) {
      whereConstrant = {
        ...whereConstrant,
        createdAt: Between(data.dateBegin, data.dateEnd),
      };
    }

    return await orderAndItemsRepository.find({
      relations: {
        orders: {
          user: true
        },
      },
      where: whereConstrant,
    });
  }

  async delete(data: DTODeleteOrderAndItems): Promise<DeleteResult> {
    const orderAndItemsRepository = PostgresDS.manager.getRepository(OrderAndItems)

    return await orderAndItemsRepository.delete(
      {
        id: In(data.id)
      }
    )
  }
}

export { RepositoryOrderAndItems };
