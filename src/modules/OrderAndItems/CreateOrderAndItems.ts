import { DTOCreateOrderAndItems } from  "@src/entity/OrderAndItems/InterfaceOrderAndItems";
import { RepositoryOrderAndItems } from "@src/entity/OrderAndItems/RepositoryOrderAndItems";
import { Request, Response } from "express";

export class CreateOrderAndItems {
    async execute(request: Request, response: Response): Promise<Response> {

        const orderAndItemsRep = new RepositoryOrderAndItems()

        const data: DTOCreateOrderAndItems = {
            quantity : request.body.quantity,
            price : request.body.price,
            discount : request.body.discount,
            item : request.body.item,
            orders : request.body.orders,
        }

        const resp = await orderAndItemsRep.create(data);

        return response.status(201).json(resp);
    }
}