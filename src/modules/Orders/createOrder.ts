import { DTOCreateOrders } from "@src/entity/Orders/InterfaceOrders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { Request, Response } from "express";

class CreateOrders {

    async execute(request: Request, response: Response): Promise<Response> {

        const rescueGroupRep = new RepositoryOrders();

        const data: DTOCreateOrders = {
            km: request.body.km,
            fuel: request.body.fuel,
            statusExecution: request.body.statusExecution,
            statusOrder: request.body.statusOrder,
            car: request.body.car,
            user: request.body.user,
        };

        const resp = await rescueGroupRep.create(data);

        return response.status(200).json(resp);
    }
}

export { CreateOrders }