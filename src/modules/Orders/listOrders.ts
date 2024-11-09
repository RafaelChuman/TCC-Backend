import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { Response, Request } from "express";

class ListOrders {
  async execute(request: Request, response: Response): Promise<Response> {
    try {
      const orderRep = new RepositoryOrders();


      console.log(
        "\n\ListOrders request.body " + JSON.stringify(request.body) + "\n\n"
      );
      console.log(
        "\n\ListOrders request.body " + JSON.stringify(request.params) + "\n\n"
      );


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

      const resp = await orderRep.findAll();
      return response.status(202).json(resp);

    } catch (e) {
      console.log(`\n\nCreateOrders - execute Error: ${JSON.stringify(e)}`);
      return response.status(422).json("Unprocessable Entity");
    }
  }
}

export { ListOrders };
