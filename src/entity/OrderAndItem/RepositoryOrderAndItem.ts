import { Between, DeleteResult, In, InsertResult } from "typeorm";
import { PostgresDS } from "@src/data-source";
import { DTOCreateOrderAndItem, DTODeleteOrderAndItem, DTOListOrderAndItemByOrder, DTOListOrderAndItemByUser, InterfaceOrderAndItem } from "./InterfaceOrderAndItem";
import { OrderAndItem } from "./OrderAndItem";

class RepositoryOrderAndItem implements InterfaceOrderAndItem {
  async create(data: DTOCreateOrderAndItem): Promise<InsertResult | null> {
    const orderAndItemRepository = PostgresDS.manager.getRepository(OrderAndItem)

    const newOrderAndItem = new OrderAndItem();

    newOrderAndItem.quantity = data.quantity
    newOrderAndItem.price = data.price
    newOrderAndItem.discount = data.discount
    newOrderAndItem.order = data.order
    newOrderAndItem.item = data.item
    newOrderAndItem.deleted = false

    const resp = await orderAndItemRepository.insert(newOrderAndItem);

    return resp;
  }

  async listByIoT(data: DTOListOrderAndItemByOrder): Promise<OrderAndItem[] | null> {
    const orderAndItemRepository = PostgresDS.manager.getRepository(OrderAndItem)

    let whereConstrant = {};

    if (data.order)
      whereConstrant = {
        ...whereConstrant,
        order: data.order,
      };

    if (data.dateBegin && data.dateEnd) {
      whereConstrant = {
        ...whereConstrant,
        createdAt: Between(data.dateBegin, data.dateEnd),
      };
    }

    return await orderAndItemRepository.find({
      relations: {
        order: true
      },
      where: whereConstrant,
    });
  }

  async listByUser(
    data: DTOListOrderAndItemByUser
  ): Promise<OrderAndItem[] | null> {
    
    const orderAndItemRepository = PostgresDS.manager.getRepository(OrderAndItem)
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

    return await orderAndItemRepository.find({
      relations: {
        order: {
          user: true
        },
      },
      where: whereConstrant,
    });
  }

  async delete(data: DTODeleteOrderAndItem): Promise<DeleteResult> {
    const orderAndItemRepository = PostgresDS.manager.getRepository(OrderAndItem)

    return await orderAndItemRepository.delete(
      {
        id: In(data.id)
      }
    )
  }
}

export { RepositoryOrderAndItem };
