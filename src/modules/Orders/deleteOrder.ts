import { DTODeleteOrders } from "@src/entity/Orders/InterfaceOrders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { AppError } from "@src/errors/AppError";
import { Response, Request } from "express";

class DeleteOrders {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const ordersRep = new RepositoryOrders();
      var id: string[] = request.body.id;
      const data: DTODeleteOrders = {
        id: id,
      };

      if (id == null || id.length == 0)
        throw new AppError("Parâmetro id incorreto", 503);

      const resp = await ordersRep.delete(data);
      return response.status(200).json(resp);

    } catch (e) {
      console.log(`DeleteOrders - execute Error: ${JSON.stringify(e)}`);
      return response.status(422).json("Database not modified.");
    }
  }
}

export { DeleteOrders };
