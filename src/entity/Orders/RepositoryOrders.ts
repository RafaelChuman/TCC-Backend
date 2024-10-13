import { PostgresDS } from "@src/data-source";
import { DeleteResult, InsertResult, In } from "typeorm";
import { Orders } from "./Orders";
import {
  DTOCreateOrders,
  DTODeleteOrders,
  DTOUpdateOrders,
  InterfaceOrders,
} from "./InterfaceOrders";

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
          userId: userId,
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
          },
        },
      },
    });
  }

  async findAll(): Promise<Orders[] | null> {
    const query = PostgresDS.manager
    .createQueryBuilder(Orders, "Orders")
    .select(`"orderId", km, fuel, "statusExecution", "statusOrder", "createdAt", deleted, updated, "userId", "carId"`)

    return await query.execute();
  }

  async findById(id: string[]): Promise<Orders[] | null> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.find({
      relations: {
        car: true,
        user: true,
      },
      where: {
        orderId: In(id),
      },
    });
  }

  async create(newOrder: Orders): Promise<InsertResult | null> {
    try {
      const ordersRepository = PostgresDS.manager.getRepository(Orders);

      console.log(
        "\n\n RepositoryOrders - create newOrder " +
          JSON.stringify(newOrder) +
          "\n\n"
      );
      const resp = await ordersRepository.insert(newOrder);

      console.log(
        "\n\n RepositoryOrders - create resp " + JSON.stringify(resp) + "\n\n"
      );
      return resp;
    } catch (e) {
      console.log(`RepositoryOrders - create Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async delete(group: DTODeleteOrders): Promise<DeleteResult> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.delete({
      orderId: In(group.id),
    });
  }

  async update(data: DTOUpdateOrders): Promise<InsertResult | null> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    const updtOrder = await ordersRepository.findOneBy({
      orderId: data.id,
    });

    if (!updtOrder) return null;

    updtOrder.km = data.km;
    updtOrder.fuel = data.fuel;
    updtOrder.statusExecution = data.statusExecution;
    updtOrder.statusOrder = data.statusOrder;
    updtOrder.deleted = false;
    updtOrder.createdAt = new Date(Date.now());

    return await ordersRepository.insert(updtOrder);
  }
}

export { RepositoryOrders };
