import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { Response, Request } from "express";

class ListOrders {
  async execute(request: Request, response: Response): Promise<Response> {


    const orderRep = new RepositoryOrders();

    const userId = request.body.userId;
    const carId = request.body.carId;


    if (carId) {
      if (typeof carId === "string") {
        const resp = await orderRep.findByCar(carId);

        return response.status(202).json(resp);
      }

    }

    if (userId) {
      if (typeof userId === "string") {
        const resp = await orderRep.listByUser(userId);

        return response.status(202).json(resp);
      }
    }

    return response.status(422).json("Unprocessable Entity");
  }
}

export { ListOrders };
