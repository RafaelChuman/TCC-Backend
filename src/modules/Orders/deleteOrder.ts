import { DTODeleteOrders } from "@src/entity/Orders/InterfaceOrders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { Response, Request } from "express";

class DeleteOrders {
  async execute(request: Request, response: Response): Promise<Response> {
    
    const ordersRep = new RepositoryOrders();
    const data: DTODeleteOrders = {
      id: request.body.id
    };

    if (data.id.length > 0) {
      if (typeof data.id[0] === "string") {
        
        const resp = await ordersRep.delete(data);
        return response.status(200).json(resp);

      }
    }
    return response.status(200).json("Database not modified.");
  }
}

export { DeleteOrders };
