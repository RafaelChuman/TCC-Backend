import { DTOUpdateOrders } from "@src/entity/Orders/InterfaceOrders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { Response, Request, response } from "express";

class UpdateOrders {
  async execute(request: Request, response: Response): Promise<Response> {

    const ordersRep = new RepositoryOrders();

    const data: DTOUpdateOrders = {
      id: request.body.id,
      km: request.body.km,
      fuel: request.body.fuel,
      statusExecution: request.body.statusExecution,
      statusOrder: request.body.statusOrder,
      car: request.body.car,
      user: request.body.user,
    };

    const resp = await ordersRep.update(data);

    return response.status(200).json(resp);
  }
}

export { UpdateOrders };
