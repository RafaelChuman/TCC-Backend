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

  async listByUpdated(updated: Date): Promise<Orders[] | null> {
    const query = PostgresDS.manager
      .createQueryBuilder(Orders, "Orders")
      .select(
        `"orderId", km, fuel, "statusExecution", "statusOrder", "createdAt", deleted, updated, "userId", "carId"`
      ).where(
        `updated > '${updated.toISOString()}'`
      ).andWhere(
        `deleted = false`);

    return await query.execute();
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
      .select(
        `"orderId", km, fuel, "statusExecution", "statusOrder", "createdAt", deleted, updated, "userId", "carId"`
      );

    return await query.execute();
  }

  async listByupdated(): Promise<Orders[] | null> {
    const query = PostgresDS.manager
      .createQueryBuilder(Orders, "Orders")
      .select(
        `"orderId", km, fuel, "statusExecution", "statusOrder", "createdAt", deleted, updated, "userId", "carId"`
      );

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

  async save(newOrder: Orders[]): Promise<Orders[] | null> {
    try {
      const ordersRepository = PostgresDS.manager.getRepository(Orders);

      return await ordersRepository.save(newOrder);
    } catch (e) {
      console.log(`RepositoryOrders - save Error: ${JSON.stringify(e)}`);
    }
    return null;
  }

  async delete(group: DTODeleteOrders): Promise<DeleteResult> {
    const ordersRepository = PostgresDS.manager.getRepository(Orders);

    return await ordersRepository.delete({
      orderId: In(group.id),
    });
  }


}

export { RepositoryOrders };
