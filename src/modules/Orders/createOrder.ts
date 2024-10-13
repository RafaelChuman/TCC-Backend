import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { DTOCreateOrders } from "@src/entity/Orders/InterfaceOrders";
import { Orders } from "@src/entity/Orders/Orders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { AppError } from "@src/errors/AppError";
import { Request, Response } from "express";

class CreateOrders {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const orderRep = new RepositoryOrders();
      const userRep = new RepositoryUser();
      const carRep = new RepositoryCar();

      const ordersList: Orders[] = [];

      console.log(
        "\n\nCreateOrders request.body " + JSON.stringify(request.body) + "\n\n"
      );

      var bodyItem: DTOCreateOrders;

      for (bodyItem of request.body) {
        const user = await userRep.findById(bodyItem.userId);
        if (user == null) throw new AppError("Parâmetro userId incorreto", 503);

        const car = await carRep.findById(bodyItem.carId);
        if (car == null) throw new AppError("Parâmetro carId incorreto", 503);

        const orders = new Orders();

        orders.orderId = bodyItem.orderId;
        orders.km = bodyItem.km;
        orders.fuel = bodyItem.fuel;
        orders.statusExecution = bodyItem.statusExecution;
        orders.statusOrder = bodyItem.statusOrder;
        orders.createdAt = bodyItem.createdAt;
        orders.updated = bodyItem.updated;
        orders.deleted = bodyItem.deleted;
        orders.car = car;
        orders.user = user;

        ordersList.push(orders)
      }

      if(ordersList.length <= 0) throw new AppError("Parâmetros incorretos", 503);

      const resp = await orderRep.save(ordersList);
      return response.status(200).json(resp);

    } catch (e) {
      console.log(`\n\nCreateOrders - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}

export { CreateOrders };
