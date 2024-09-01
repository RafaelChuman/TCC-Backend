import { Response, Request } from "express";
import { RepositoryItem } from "@src/entity/Item/RepositoryItem";
import { DTODeleteItem } from "@src/entity/Item/InterfaceItem";

class DeleteItem{
  async execute(request: Request, response: Response): Promise<Response> {
    
    const itemRepository = new RepositoryItem();
    const idParam: string[] = request.body.id;

    if (idParam.length > 0) {
      const data: DTODeleteItem = {
        id: idParam
      };
      
      const resp = await itemRepository.delete(data);

      return response.status(200).json(resp);
    }

    return response.status(200).json("Database not modified.");;
  }
}

export { DeleteItem };
