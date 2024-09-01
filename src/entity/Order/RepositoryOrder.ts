import { PostgresDS } from "@src/data-source";
import { DeleteResult, InsertResult, In } from "typeorm";
import { User } from "../User/User";
import { Order } from "./Order";
import { DTOCreateOrder, DTODeleteOrder, DTOUpdateOrder, InterfaceOrder } from "./InterfaceOrder";

class RepositoryOrder implements InterfaceOrder {

  async listByUser(userId: string): Promise<Order[]> {
    const orderRepository = PostgresDS.manager.getRepository(Order);

    return await orderRepository.find({
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

  async findByCar(idCar: string): Promise<Order | null> {
    const orderRepository = PostgresDS.manager.getRepository(Order);

    return await orderRepository.findOne({
      relations: {
        car: true,
        user: true,
      },
      where: {
        user: {
          car: {
            id: idCar,
          }
        },
      },
    });
  }

  async create(data: DTOCreateOrder): Promise<InsertResult> {
    const orderRepository = PostgresDS.manager.getRepository(Order);

    const newOrder = new Order();

    newOrder.km = data.km
    newOrder.fuel = data.fuel
    newOrder.statusExecution = data.statusExecution
    newOrder.statusOrder = data.statusOrder
    newOrder.deleted = false

    const resp = await orderRepository.insert(newOrder);

    return resp;
  }

  async delete(group: DTODeleteOrder): Promise<DeleteResult> {
    const orderRepository = PostgresDS.manager.getRepository(Order);

    return await orderRepository.delete({
      id: In(group.ids),
    });
  }

  async update(data: DTOUpdateOrder): Promise<InsertResult | null> {
    const orderRepository = PostgresDS.manager.getRepository(Order);

    const updtOrder = await orderRepository.findOneBy({
      id: data.id,
    });

    if (!updtOrder) return null;

    updtOrder.km = data.km
    updtOrder.fuel = data.fuel
    updtOrder.statusExecution = data.statusExecution
    updtOrder.statusOrder = data.statusOrder
    updtOrder.deleted = false
    updtOrder.createdAt = new Date(Date.now())

    return await orderRepository.insert(updtOrder);

  }
}

export { RepositoryOrder };
