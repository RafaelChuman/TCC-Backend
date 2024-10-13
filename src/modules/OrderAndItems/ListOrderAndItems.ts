import {
  DTOListOrderAndItemsByOrder,
  DTOListOrderAndItemsByUser,
} from "@src/entity/OrderAndItems/InterfaceOrderAndItems";
import { RepositoryOrderAndItems } from "@src/entity/OrderAndItems/RepositoryOrderAndItems";
import { Request, Response } from "express";

export class ListOrderAndItems {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const orderAndItemsRep = new RepositoryOrderAndItems();

      const userId = request.body.userId;
      const orderId = request.body.orderId;

      if (userId) {
        const data: DTOListOrderAndItemsByUser = {
          userId: request.body.userId,
          dateBegin: new Date(request.body.dateBegin),
          dateEnd: new Date(request.body.dateBegin),
        };

        const resp = await orderAndItemsRep.listByUser(data);
        return response.status(200).json(resp);
      }

      if (orderId) {
        const data: DTOListOrderAndItemsByOrder = {
          orderId: request.body.orderId,
          dateBegin: new Date(request.body.dateBegin),
          dateEnd: new Date(request.body.dateBegin),
        };

        const resp = await orderAndItemsRep.listByOrder(data);
        return response.status(200).json(resp);
      }

      const resp = await orderAndItemsRep.findAll();
      return response.status(200).json(resp);

    } catch (e) {
      console.log(`\n\nCreateOrders - execute Error: ${JSON.stringify(e)}`);
      return response.status(422).json("Unprocessable Entity");
    }
  }
}
