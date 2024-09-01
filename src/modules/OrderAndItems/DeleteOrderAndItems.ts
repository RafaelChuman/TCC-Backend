import { DTODeleteOrderAndItems } from "@src/entity/OrderAndItems/InterfaceOrderAndItems";
import { RepositoryOrderAndItems } from "@src/entity/OrderAndItems/RepositoryOrderAndItems";
import { Request, Response } from "express";

export class DeleteOrderAndItems {
    async execute(request: Request, resp: Response) {
        
        const orderAndItemsRep = new RepositoryOrderAndItems();
        const data: DTODeleteOrderAndItems = {
            id: request.body.id
        }

        const response = orderAndItemsRep.delete(data);

        return resp.status(200).json(response);
    }
}