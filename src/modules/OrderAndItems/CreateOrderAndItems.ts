import { DTOCreateOrderAndItems } from  "@src/entity/OrderAndItems/InterfaceOrderAndItems";
import { OrderAndItems } from "@src/entity/OrderAndItems/OrderAndItems";
import { RepositoryOrderAndItems } from "@src/entity/OrderAndItems/RepositoryOrderAndItems";
import { Orders } from "@src/entity/Orders/Orders";
import { RepositoryOrders } from "@src/entity/Orders/RepositoryOrders";
import { AppError } from "@src/errors/AppError";
import { OrderAndItemsRoutes } from "@src/routes/OrderAndItems.routes";
import { Request, Response } from "express";

export class CreateOrderAndItems {
    async execute(request: Request, response: Response): Promise<Response> {
        try {
        const orderAndItemsRep = new RepositoryOrderAndItems()
        const orderRep = new RepositoryOrders();
        
        var order: Orders | null = null;
        var bodyItem: DTOCreateOrderAndItems
        var data: OrderAndItems[] = new Array()

        for (bodyItem of request.body ) {
  
            const newOrderAndItems = new OrderAndItems();

            if(order == null){
                const listOfOrdersAndItems =  await orderRep.findById([bodyItem.orderId]);
                
                if(listOfOrdersAndItems != null && listOfOrdersAndItems?.length > 0) order = listOfOrdersAndItems[0]
            } 
  
            if(order == null) throw new AppError("Parâmetro orderId incorreto", 503);
           
            newOrderAndItems.id = bodyItem.id;
            newOrderAndItems.type = bodyItem.type;
            newOrderAndItems.name = bodyItem.name;
            newOrderAndItems.unitMeasurement =  bodyItem.unitMeasurement;
            newOrderAndItems.quantity = bodyItem.quantity;
            newOrderAndItems.price = bodyItem.price;
            newOrderAndItems.discount = bodyItem.discount;
            newOrderAndItems.createdAt = bodyItem.createdAt;
            newOrderAndItems.updated = bodyItem.updated;
            newOrderAndItems.deleted = bodyItem.deleted;
            newOrderAndItems.orders = order;

            data.push(newOrderAndItems)
        }

        if(data.length <= 0) throw new AppError("Parâmetros incorretos", 503);

        const resp = await orderAndItemsRep.save(data);
        return response.status(201).json(resp);
        


    } catch (e) {

        console.log(`CreateOrderAndItems - execute Error: ${JSON.stringify(e)}`);
        return response.status(400).json(JSON.stringify(e));
  
      }    
    }
}