import { RepositoryCar } from "@src/entity/Car/RepositoryCar";
import { OrderAndItems } from "@src/entity/OrderAndItems/OrderAndItems";
import { DTOCreateOrders, DTOUpdateOrders } from "@src/entity/Orders/InterfaceOrders";
import { Orders } from "@src/entity/Orders/Orders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { RepositoryUser } from "@src/entity/User/RepositoryUser";
import { AppError } from "@src/errors/AppError";
import { Response, Request, response } from "express";
import { InsertResult } from "typeorm";

class UpdateOrders {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const ordersRep = new RepositoryOrders();
      const userRep = new RepositoryUser();
      const carRep = new RepositoryCar();
      
      const orders = new Orders();

      var resp : InsertResult | null = null
      var bodyItem : DTOCreateOrders | null = null

      for (bodyItem of request.body) {

        if(bodyItem == null || bodyItem.orderId == null || bodyItem.orderId == "") throw new AppError("Parâmetro orderId incorreto", 503);
        const ord = await ordersRep.findById([bodyItem.orderId]);

        if(ord == null) throw new AppError("Parâmetro orderId Não encontrado", 503);

        const user = await userRep.findById(bodyItem.userId);
        if (user == null) throw new AppError("Parâmetro userId incorreto", 503);

        const car = await carRep.findById(bodyItem.carId);
        if (car == null) throw new AppError("Parâmetro carId incorreto", 503);

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

        resp = await ordersRep.save(orders);
      };

      return response.status(200).json(resp);

    } catch (e) {
      console.log(`UpdateCar - execute Error: ${JSON.stringify(e)}`);
      return response.status(400).json(JSON.stringify(e));
    }
  }
}

export { UpdateOrders };
