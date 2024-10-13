import { DTODeleteOrderAndItems } from "@src/entity/OrderAndItems/InterfaceOrderAndItems";
import { RepositoryOrderAndItems } from "@src/entity/OrderAndItems/RepositoryOrderAndItems";
import { AppError } from "@src/errors/AppError";
import { Request, Response } from "express";

export class DeleteOrderAndItems {
  async execute(request: Request, response: Response) {
    try {
      const orderAndItemsRep = new RepositoryOrderAndItems();

      console.log(`DeleteOrderAndItems - execute request.body: ${JSON.stringify(request.body)}`);

      var id: string[] = request.body.id;
      var orderId: string[] = request.body.orderId;

      if (id != null && id.length > 0) {
        // const data: DTODeleteOrderAndItems = {
        //   id: id,
        // };

        const resp = orderAndItemsRep.purgeById(id);
        return response.status(200).json(resp);
      }

      if (orderId != null && orderId.length > 0) {
        const resp = orderAndItemsRep.purgeByOrderid(orderId);
        return response.status(200).json(resp);
      }

      throw new AppError("Parâmetros incorretos", 503);
    } catch (e) {
      console.log(`DeleteOrderAndItems - execute Error: ${JSON.stringify(e)}`);
      return response.status(422).json("Database not modified.");
    }
  }
}
