import { PostgresDS } from "@src/data-source";
import { DeleteResult, InsertResult, In } from "typeorm";
import { Orders } from "./Orders";
import { DTOCreateOrders, DTODeleteOrders, DTOUpdateOrders, InterfaceOrders } from "./InterfaceOrders";

class RepositoryOrders implements InterfaceOrders {

  async listByUser(userId: string): Promise<Orders[] | null> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.find({
      relations: {
        car: true,
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findByCar(plate: string): Promise<Orders[] | null> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.find({
      relations: {
        car: true,
        user: true,
      },
      where: {
        user: {
          car: {
            plate: plate,
          }
        },
      },
    });
  }

  async create(data: DTOCreateOrders): Promise<InsertResult> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    const newOrder = new Orders();

    newOrder.km = data.km
    newOrder.fuel = data.fuel
    newOrder.statusExecution = data.statusExecution
    newOrder.statusOrder = data.statusOrder
    newOrder.deleted = false

    const resp = await ordersRepository.insert(newOrder);

    return resp;
  }

  async delete(group: DTODeleteOrders): Promise<DeleteResult> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.delete({
      id: In(group.id),
    });
  }

  async update(data: DTOUpdateOrders): Promise<InsertResult | null> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    const updtOrder = await ordersRepository.findOneBy({
      id: data.id,
    });

    if (!updtOrder) return null;

    updtOrder.km = data.km
    updtOrder.fuel = data.fuel
    updtOrder.statusExecution = data.statusExecution
    updtOrder.statusOrder = data.statusOrder
    updtOrder.deleted = false
    updtOrder.createdAt = new Date(Date.now())

    return await ordersRepository.insert(updtOrder);

  }
}

export { RepositoryOrders };
